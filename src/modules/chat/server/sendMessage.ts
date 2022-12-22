import { Socket } from 'socket.io';

import { MessageScope, MessageType, SocketEvents } from '../common';

const sendMessage = (socket: Socket, type: MessageType, text: string) => {
	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, {
		scope: MessageScope.CLIENT,
		type,
		time: new Date(),
		author: 'SERVER',
		text,
	});
};

export default sendMessage;
