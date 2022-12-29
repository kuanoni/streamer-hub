import { Socket } from 'socket.io';

import { SocketEvents } from '../common';

const serverSendEmbedMsg = (socket: Socket, data: Embed) => {
	const msg: EmbedMessage = {
		time: new Date().getTime(),
		data,
	};

	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, msg);
};

export default serverSendEmbedMsg;
