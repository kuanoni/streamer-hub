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
				return serverSendEmbedMsg(socket, { title: 'You have connected. Sign in to chat.' });

			const parsedCookie = parseCookieString(socket.handshake.headers.cookie);

			// validate session token
			const session = await validateSessionToken(parsedCookie['next-auth.session-token']);
			if (!session) return serverSendEmbedMsg(socket, { title: 'You have connected. Sign in to chat.' });

			// get user data, add it to socket
			const user = await getUserById(session.userId);
			if (!user) return serverSendEmbedMsg(socket, { title: 'You have connected. Sign in to chat.' });
			socket.user = user;

			// add socket event listeners
			socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage(socket)));
			socket.on(SocketEvents.CLIENT_SEND_COMMAND, errorHandler(sentCommand(socket)));

			// emit "You have connected." message
			return serverSendEmbedMsg(socket, { title: 'You have connected.' });
		};

		io.on('connection', onConnection);

		res.socket.server.io = io;
	}

	return res;
};
