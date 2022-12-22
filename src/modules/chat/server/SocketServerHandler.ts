import { Server as IOServer, Socket } from 'socket.io';

import { AuthPerms } from '@globalTypes/custom-auth';
import { NextApiResponseWithSocket } from '@globalTypes/socketio';

import { MessageScope, MessageType, SocketEvents, SocketRooms } from '../common';
import sentMessage from './eventHandlers/sentMessage';
import sendMessage from './sendMessage';

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

		// assign socket to rooms based on passed user role
		io.use(async (socket, next) => {
			if (socket.handshake.auth.role === AuthPerms.ADMIN) socket.join(SocketRooms.ADMIN);
			if (socket.handshake.auth.role === AuthPerms.MOD) socket.join(SocketRooms.MODERATOR);
			next();
		});

		const onConnection = async (socket: Socket) => {
			// add socket event listeners
			socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage(socket)));

			// emit "You have connected." message
			sendMessage(socket, MessageType.INFO, 'You have connected.');
		};

		io.on('connection', onConnection);

		res.socket.server.io = io;
	}

	return res;
};
