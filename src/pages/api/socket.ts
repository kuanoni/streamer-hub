import messageHandler from '@/utils/messageHandler';
import next, { NextApiRequest } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import { NextApiResponseWithSocket } from 'types/socketio';

export default async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) {
		console.log('Starting socket.io server');

		const io = new IOServer(res.socket.server);

		io.on('connection', async (socket) => {
			// show active sockets for debugging
			const sockets = await io.fetchSockets();
			console.log(sockets.map((socket) => socket.id));

			socket.on('createdMessage', (msg) => socket.nsp.emit('incomingMessage', msg));
		});

		res.socket.server.io = io;
	} else {
		// console.log('Socket.io server already running');
	}
	res.end();
};
