import { createContext } from 'react';

import { ClientMessage, ClientOnlyMessage, ServerMessage } from '@globalTypes/socketio';

export interface SocketProviderIface {
	readonly messageLogs: (ClientMessage | ClientOnlyMessage)[];
	writeMessage: (msg: ClientMessage) => void;
	sendMessage: (msg: ServerMessage) => void;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
