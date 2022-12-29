import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';
import { v4 } from 'uuid';

import { MessageType } from '@globalTypes/user';
import createEmbedMessage from '@modules/chat/utils/createEmbedMessage';
import parseCommandText from '@modules/chat/utils/parseCommandText';

import { DispatchAction, EmbedColors, MessageList, SocketEvents } from '../../common';
import SocketContext, { SocketProviderIface } from './SocketContext';

const messageListReducer = (state: MessageList, action: DispatchAction): MessageList => {
	switch (action.type) {
		case 'push': {
			return [...state, action.payload];
		}
		case 'removeLast': {
			return [...state.slice(0, state.length - 1)];
		}
		case 'updateTextMsg': {
			const { id, data }: { id: string; data: string } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);
			const msg = state[msgIndex];

			if (msg.type !== MessageType.TEXT) {
				console.log('err');

				return state;
			}

			const newMsg: UserMessage = { ...msg, data };
			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'updateEmbedMsg': {
			const { id, data }: { id: string; data: EmbedData } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);
			const msg = state[msgIndex];

			if (msg.type !== MessageType.EMBED) return state;

			const newData = { ...msg.data, ...data };
			const newMsg: EmbedMessage = { ...msg, data: newData };
			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'replaceMsg': {
			const { id, newMsg }: { id: string; newMsg: UserMessage | EmbedMessage } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);

			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'clear':
			return [];
	}

	throw new Error(`Unknown action: ${action}`);
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);

	const [messageList, dispatch] = useReducer<typeof messageListReducer>(messageListReducer, []);

	// saves msg to messageList, which is a list that renders in ChatMessageList
	const writeMessage = (msg: UserMessage) => {
		dispatch({ type: 'push', payload: msg });
	};

	// send msg over socket connection
	const sendMessage = (msg: UserMessageToServer) => {
		if (!data?.user || !socket) return;

		msg.data = msg.data.trim();

		if (msg.data.startsWith('/')) sendCommand(msg);
		else socket.emit(SocketEvents.CLIENT_SEND_MSG, msg);
	};

	const sendCommand = (msg: UserMessageToServer) => {
		if (!data?.user || !socket) return;

		const [name, params] = parseCommandText(msg.data);
		if (!name) return console.log('Invalid command');

		const commandMessage: CommandMessage = { name, params };

		socket.emit(SocketEvents.CLIENT_SEND_COMMAND, commandMessage);
	};

	useEffect(() => {
		// make sure the server is running
		fetch('/api/socket');

		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { authLevel: data?.user?.authLevel } });
		newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: UserMessage) => writeMessage(msg));
		newSocket.connect();

		// create and write 'Attempting to connect...' message
		const id = v4();
		const connectingEmbedMsg: EmbedMessage = createEmbedMessage(
			{ description: 'Attempting to connect...', color: EmbedColors.blue },
			id
		);

		dispatch({ type: 'push', payload: connectingEmbedMsg });

		// when connected, update message
		newSocket.on('connected', (data) => {
			dispatch({
				type: 'updateEmbedMsg',
				payload: { id, data: { description: data.message, footer: {}, color: EmbedColors.green } },
			});
		});

		// save socket to state
		setSocket((currentSocket) => {
			currentSocket?.disconnect();
			return newSocket;
		});

		// cleanup
		return () => {
			newSocket.disconnect();
			dispatch({ type: 'clear' });
		};
	}, [data?.user?.authLevel]);

	const providerData: SocketProviderIface = Object.freeze({
		sendMessage,
		dispatch,
		messageList,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
