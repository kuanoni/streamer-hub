import { Server as IOServer, Socket } from 'socket.io';

export default (io: IOServer, socket: Socket) => {
	const createdMessage = (msg: string) => {
		socket.broadcast.emit('newIncomingMessage', msg);
	};

	socket.on('createdMessage', createdMessage);
};
