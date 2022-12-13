import { Message, MessageWithoutTime } from '@globalTypes/socketio';

import { Socket } from 'socket.io-client';

export interface SocketProviderIface {
	readonly socket: Socket | null;
	readonly messageLogs: Message[];
	writeMessage: (msg: Message) => void;
	sendMessage: (msg: MessageWithoutTime) => void;
}
