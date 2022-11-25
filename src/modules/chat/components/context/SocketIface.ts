import { Socket } from 'socket.io-client';
import { Message } from 'types/socketio';

export interface SocketIface {
	readonly socket: Socket | null;
	readonly messageLogs: Message[];
	sendMessage: (message: string) => void;
}
