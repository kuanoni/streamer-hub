import { Socket } from 'socket.io';

import { SocketEvents } from '../common';

const serverSendTextMsg = (socket: Socket, data: string) => {
	const msg: UserMessage = {
		author: 'SERVER',
		time: new Date().getTime(),
		data,
	};

	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, msg);
};

export default serverSendTextMsg;
