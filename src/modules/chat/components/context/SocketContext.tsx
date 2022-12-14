import { createContext } from 'react';

import { Message, MessageWithoutTime } from '@globalTypes/socketio';

export interface SocketProviderIface {
	readonly messageLogs: Message[];
	writeMessage: (msg: Message) => void;
	sendMessage: (msg: MessageWithoutTime) => void;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
