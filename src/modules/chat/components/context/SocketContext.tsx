import { createContext } from 'react';

import { EmbedMessage, UserMessage, UserMessageToServer } from '@globalTypes/socketio';

export interface SocketProviderIface {
	readonly messageLogs: (UserMessage | EmbedMessage)[];
	writeMessage: (msg: UserMessage) => void;
	sendMessage: (msg: UserMessageToServer) => void;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
