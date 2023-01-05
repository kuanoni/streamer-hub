import { User } from 'next-auth';
import { Server as IOServer, Socket } from 'socket.io';

import { NextApiResponseWithSocket } from '@globalTypes/socketio';
import { AuthPerms } from '@globalTypes/user';
import getUserById from '@utils/database/getUserById';
import validateSessionToken from '@utils/database/validateSessionToken';
import parseCookieString from '@utils/parseCookieString';

import { SocketEvents, SocketRooms, UsersList, UsersListItem } from '../common';
import sentMessage from './eventHandlers/sentMessage';

const errorHandler = (handler: Function) => {
	const handleError = (err: Error) => {
		console.error(err);
	};

	return (...args: any[]) => {
		try {
			const handlerReturn = handler(...args);

			// async handler
			if (handlerReturn && typeof handlerReturn.catch === 'function') {
				handlerReturn.catch((err: Error) => handleError(err));
			}
		} catch (err: any) {
			// sync handler
			handleError(err);
		}
	};
};

export const SocketServerHandler = (res: NextApiResponseWithSocket) => {
	if (res.socket.server.io) return res;

	console.log('Starting socket.io server');

	const io = new IOServer(res.socket.server);

	// gets a list of users from all connected sockets except the id specified
	const getUsersList = async () => {
		const usersList: UsersList = [];
		const allSockets = await io.fetchSockets();

		allSockets.forEach((socket) => {
			if (!socket.user || !socket.user.username) return;
			const { username, subscriptionTier, role } = socket.user;

			const userListItem: UsersListItem = { username };

			// add optional properties if they exist
			if (subscriptionTier) userListItem.subTier = subscriptionTier;
			if (role) userListItem.role = role;

			usersList.push(userListItem);
		});

		return usersList;
	};

	// attempt to use session token gathered from header cookies to validate socket and fetch user data
	const tryToFetchUserData = async (socket: Socket): Promise<[User | undefined, string]> => {
		// check for cookies
		if (!socket.handshake.headers.cookie) return [, 'You are connected.\n **Sign in to chat**'];

		// get cookies from socket handshake
		const parsedCookie = parseCookieString(socket.handshake.headers.cookie);

		// validate session token from cookies
		const session = await validateSessionToken(parsedCookie['next-auth.session-token']);
		if (!session) return [, 'You are connected.\n **Sign in to chat**'];

		// use session data to get user data, add it to socket
		const user = await getUserById(session.userId);
		if (!user) return [, 'Failed to retrieve user data. Try logging in again.'];

		return [user, 'You have connected'];
	};

	// add socket to appropriate rooms and event listeners
	const handleUserSocket = (socket: Socket, user: User) => {
		socket.user = user;
		if (!user.username) return;

		// assign socket to rooms based on user authLevel
		if (user.authLevel === AuthPerms.ADMIN) socket.join(SocketRooms.ADMIN);
		if (user.authLevel <= AuthPerms.MOD) socket.join(SocketRooms.MODERATOR);

		// add socket event listeners
		socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage(socket)));
		socket.on('disconnect', () => {
			socket.nsp.emit(SocketEvents.LEAVE, user.username);
		});

		// broadcast to all sockets that user has joined
		const { username, subscriptionTier: subTier, role } = user;
		const listItem: UsersListItem = {
			username,
			...(subTier ? { subTier } : {}),
			...(role ? { role } : {}),
		};

		socket.nsp.emit(SocketEvents.JOIN, listItem);
	};

	io.on('connection', async (socket: Socket) => {
		const usersList = await getUsersList();
		const [user, message] = await tryToFetchUserData(socket);

		if (user) handleUserSocket(socket, user);

		socket.emit('connected', { authenticated: !!user, message, usersList });
	});

	res.socket.server.io = io;

	return res;
};
