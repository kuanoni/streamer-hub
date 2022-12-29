import { createContext, Dispatch } from 'react';

import { DispatchAction, MessageList } from '@modules/chat/common';

export interface SocketProviderIface {
	sendMessage: (msg: UserMessageToServer) => void;
	dispatch: Dispatch<DispatchAction>;
	messageList: MessageList;
}

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
