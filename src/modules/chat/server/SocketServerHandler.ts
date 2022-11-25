import { Server as IOServer } from 'socket.io';
import { NextApiResponseWithSocket } from 'types/socketio';
import { messageHandler } from './ServerEventHandlers';

export const SocketServerHandler = (res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) {
		console.log('Starting socket.io server');

		const io = new IOServer(res.socket.server);

		io.on('connection', async (socket) => {
			// show active sockets for debugging
			const sockets = await io.fetchSockets();
			console.log(sockets.map((socket) => socket.id));

			messageHandler(socket);
		});

		res.socket.server.io = io;
	} else {
		// console.log('Socket.io server already running');
	}

	return res;
};
