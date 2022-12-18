import { createContext } from 'react';

import { ClientMessage, ServerMessage } from '@globalTypes/socketio';

export interface SocketProviderIface {
	readonly messageLogs: ClientMessage[];
	writeMessage: (msg: ClientMessage) => void;
	sendMessage: (msg: ServerMessage) => void;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
