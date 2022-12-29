import { createContext, Dispatch } from 'react';

import { DispatchAction, MessageList } from '@modules/chat/common';

export interface SocketProviderIface {
	readonly messageLogs: (UserMessage | EmbedMessage)[];
	writeMessage: (msg: UserMessage) => void;
	sendMessage: (msg: UserMessageToServer) => void;
	dispatch: Dispatch<DispatchAction>;
	messageList: MessageList;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
