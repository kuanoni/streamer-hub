import { Socket } from 'socket.io';
import { Message } from 'types/socketio';

export const messageHandler = (socket: Socket) => {
	const createdMessage = (msg: Message) => {
		socket.nsp.emit('incomingMessage', msg);
	};

	console.log(socket.handshake.time);

	// find some way to persist an array of messages on the server side
	// add new messages to it and then emit it to clients

	socket.on('createdMessage', createdMessage);
};
