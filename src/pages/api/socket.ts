import messageHandler from '@/utils/messageHandler';
import { NextApiRequest } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import { NextApiResponseWithSocket } from 'types/socketio';

export default (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	// It means that socket server was already initialised
	if (res.socket.server.io) {
		console.log('Already set up');
		res.end();
		return;
	}

	const io = new IOServer(res.socket.server);
	res.socket.server.io = io;

	const onConnection = (socket: Socket) => {
		messageHandler(io, socket);
	};

	// Define actions inside
	io.on('connection', onConnection);

	console.log('Setting up socket');
	res.end();
};
