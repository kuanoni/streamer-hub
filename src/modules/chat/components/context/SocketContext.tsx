import { createContext } from 'react';

import {
	MessageClientOnly, MessageClientToServer, MessageServerToClient
} from '@globalTypes/socketio';

export interface SocketProviderIface {
	readonly messageLogs: (MessageServerToClient | MessageClientOnly)[];
	writeMessage: (msg: MessageServerToClient) => void;
	sendMessage: (msg: MessageClientToServer) => void;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
