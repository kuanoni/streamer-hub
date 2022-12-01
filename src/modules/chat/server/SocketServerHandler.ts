import { Server as IOServer } from 'socket.io';
import { NextApiResponseWithSocket } from 'types/socketio';
import { AuthPerms } from 'types/custom-auth';
import { connectionHandler, messageHandler } from './SocketEventHandlers';
import { SocketRooms } from '../common';

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

		// add socket event listeners
		io.on('connection', async (socket) => {
			connectionHandler(socket);
			messageHandler(socket);
		});

		res.socket.server.io = io;
	}

	return res;
};
