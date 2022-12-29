import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';

import { MessageType } from '@globalTypes/user';

import { SocketEvents } from '../common';

const serverSendEmbedMsg = (socket: Socket, data: EmbedData) => {
	const msg: EmbedMessage = {
		id: randomUUID(),
		type: MessageType.EMBED,
		time: new Date().getTime(),
		data,
	};

	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, msg);
};

export default serverSendEmbedMsg;
