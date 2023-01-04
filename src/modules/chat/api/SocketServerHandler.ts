import { Server as IOServer, Socket } from 'socket.io';

import { NextApiResponseWithSocket } from '@globalTypes/socketio';
import { AuthPerms } from '@globalTypes/user';
import getUserById from '@utils/database/getUserById';
import validateSessionToken from '@utils/database/validateSessionToken';
import parseCookieString from '@utils/parseCookieString';

import { SocketEvents, SocketRooms } from '../common';
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

	const onConnection = async (socket: Socket) => {
		if (!socket.handshake.headers.cookie) {
			socket.emit('connected', {
				authenticated: false,
				message: 'You are connected.\n **Sign in to chat**',
			});
			return;
		}

		// get cookies from socket handshake
		const parsedCookie = parseCookieString(socket.handshake.headers.cookie);

		// validate session token from cookies
		const session = await validateSessionToken(parsedCookie['next-auth.session-token']);
		if (!session) {
			socket.emit('connected', {
				authenticated: false,
				message: 'You are connected.\n **Sign in to chat**',
			});
			return;
		}

		// use session data to get user data, add it to socket
		const user = await getUserById(session.userId);
		if (!user) {
			socket.emit('connected', {
				authenticated: false,
				message: 'Failed to retrieve user data. Try logging in again.',
			});
			return;
		}
		socket.user = user;

		// assign socket to rooms based on user authLevel
		if (user.authLevel === AuthPerms.ADMIN) socket.join(SocketRooms.ADMIN);
		if (user.authLevel <= AuthPerms.MOD) socket.join(SocketRooms.MODERATOR);

		// add socket event listeners
		socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage(socket)));

		socket.emit('connected', { authenticated: true, message: 'You have connected.' });
	};

	io.on('connection', onConnection);

	res.socket.server.io = io;

	return res;
};
