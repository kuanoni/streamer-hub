import { Socket } from 'socket.io-client';
import { Message } from 'types/socketio';
import { MessageType } from '../../common';

export interface SocketIface {
	readonly socket: Socket | null;
	readonly messageLogs: Message[];
	createMessage: (type: MessageType, author: string, text: string) => Message;
	writeMessage: (msg: Message) => void;
	sendMessage: (msh: Message) => void;
}
