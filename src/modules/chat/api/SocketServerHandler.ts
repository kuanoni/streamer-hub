import { Server as IOServer, Socket } from 'socket.io';

import { NextApiResponseWithSocket } from '@globalTypes/socketio';
import { AuthPerms } from '@globalTypes/user';
import getUserById from '@utils/database/getUserById';
import validateSessionToken from '@utils/database/validateSessionToken';
import parseCookieString from '@utils/parseCookieString';

import { SocketEvents, SocketRooms } from '../common';
import sentCommand from './eventHandlers/sentCommand';
import sentMessage from './eventHandlers/sentMessage';
import serverSendEmbedMsg from './serverSendEmbedMsg';
import serverSendTextMsg from './serverSendTextMsg';

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
	if (!res.socket.server.io) {
		console.log('Starting socket.io server');

		const io = new IOServer(res.socket.server);

		// assign socket to rooms based on passed user authLevel
		io.use(async (socket, next) => {
			if (socket.handshake.auth.authLevel === AuthPerms.ADMIN) socket.join(SocketRooms.ADMIN);
			if (socket.handshake.auth.authLevel === AuthPerms.MOD) socket.join(SocketRooms.MODERATOR);
			next();
		});

		const onConnection = async (socket: Socket) => {
			if (!socket.handshake.headers.cookie)
				return socket.emit('connected', {
					connected: true,
					authenticated: false,
					message: 'You are connected.\n **Sign in to chat**',
				});

			// get cookies from socket handshake
			const parsedCookie = parseCookieString(socket.handshake.headers.cookie);

			// validate session token from cookies
			const session = await validateSessionToken(parsedCookie['next-auth.session-token']);
			if (!session)
				return socket.emit('connected', {
					connected: true,
					authenticated: false,
					message: 'You are connected.\n **Sign in to chat**',
				});

			// use session data to get user data, add it to socket
			const user = await getUserById(session.userId);
			if (!user)
				return socket.emit('connected', {
					connected: true,
					authenticated: false,
					message: 'Failed to retrieve user data. Try logging in again.',
				});
			socket.user = user;

			// add socket incoming event listeners
			socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage(socket)));
			socket.on(SocketEvents.CLIENT_SEND_COMMAND, errorHandler(sentCommand(socket)));

			socket.emit('connected', { connected: true, authenticated: true, message: 'You have connected.' });
		};

		io.on('connection', onConnection);

		res.socket.server.io = io;
	}

	return res;
};
