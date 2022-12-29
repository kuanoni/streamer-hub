import { Socket } from 'socket.io';

import { MessageType } from '@globalTypes/user';

import { SocketEvents } from '../common';

const serverSendTextMsg = (socket: Socket, data: string) => {
	const msg: UserMessage = {
		type: MessageType.TEXT,
		author: 'SERVER',
		time: new Date().getTime(),
		data,
	};

	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, msg);
};

export default serverSendTextMsg;
