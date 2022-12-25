import { Socket } from 'socket.io';

const sendMessage = (socket: Socket, text: string) => {
	// socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, {
	// 	scope: MessageScope.CLIENT,
	// 	type,
	// 	time: new Date(),
	// 	author: 'SERVER',
	// 	text,
	// });
};

export default sendMessage;
