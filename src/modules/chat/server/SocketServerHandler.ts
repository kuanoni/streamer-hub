import { Server as IOServer } from 'socket.io';
import { NextApiResponseWithSocket } from 'types/socketio';
import { Role } from 'types/custom-auth';
import { messageHandler } from './ServerEventHandlers';
import { MessageType } from '../common';

export const SocketServerHandler = (res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) {
		console.log('Starting socket.io server');

		const io = new IOServer(res.socket.server);

		io.use(async (socket, next) => {
			if (socket.handshake.auth.role === Role.ADMIN) socket.join('admin');
			if (socket.handshake.auth.role === Role.MOD) socket.join('moderator');

			next();
		});

		io.on('connection', async (socket) => {
			const sockets = await io.fetchSockets();
			console.log(`Connected: ${socket.id}`);
			// console.log(`Auth: ${socket.handshake.auth.role}`);
			console.log(
				'Current sockets: ',
				sockets.map((socket) => socket.id)
			);


			messageHandler(socket);

			socket.on('disconnect', async (reason) => {
				const sockets = await io.fetchSockets();
				console.log(`Disconnected: ${reason}`);
				console.log(
					'Current sockets: ',
					sockets.map((socket) => socket.id)
				);
			});
		});

		res.socket.server.io = io;
	} else {
		// console.log('Socket.io server already running');
	}

	return res;
};
