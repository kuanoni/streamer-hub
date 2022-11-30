import { Socket } from 'socket.io-client';
import { Message, MessageWithoutTime } from 'types/socketio';

export interface SocketIface {
	readonly socket: Socket | null;
	readonly messageLogs: Message[];
	writeMessage: (msg: Message) => void;
	sendMessage: (msg: MessageWithoutTime) => void;
}
