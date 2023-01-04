import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';
import { v4 } from 'uuid';

import createEmbedMessage from '@modules/chat/utils/createEmbedMessage';

import { EmbedColors, SocketEvents } from '../../common';
import messageListReducer from './messageListReducer';
import SocketContext, { SocketProviderIface } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { status } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageList, dispatch] = useReducer<typeof messageListReducer>(messageListReducer, []);
	const controllerRef = useRef<AbortController | null>();

	// saves msg to messageList, which is a list that renders in ChatMessageList
	const writeMessage = (msg: UserMessage) => {
		dispatch({ type: 'push', payload: msg });
	};

	// send msg over socket connection
	const sendMessage = (msg: UserMessageToServer) => {
		if (status !== 'authenticated' || !socket)
			return dispatch({
				type: 'push',
				payload: createEmbedMessage({
					description: 'You must sign in to send chat messages.',
					color: EmbedColors.red,
				}),
			});

		msg.data = msg.data.trim();
		socket.emit(SocketEvents.CLIENT_SEND_MSG, msg);
	};

	useEffect(() => {
		// create and write 'Attempting to connect...' message
		const id = v4();
		const connectingEmbedMsg: EmbedMessage = createEmbedMessage(
			{ description: 'Attempting to connect...', color: EmbedColors.blue },
			id
		);
		dispatch({ type: 'push', payload: connectingEmbedMsg });

		// don't try to connect until auth is done loading
		if (status === 'loading')
			return () => {
				socket?.disconnect();
				dispatch({ type: 'clear' });
			};

		async function createSocket() {
			// cancel running fetch requests
			if (controllerRef.current) controllerRef.current.abort();
			// create new AbortController
			const controller = new AbortController();
			controllerRef.current = controller;

			try {
				// make sure the server is running
				await fetch('/api/socket', { signal: controllerRef.current.signal });

				// create new socket connection
				const newSocket = SocketIO({
					forceNew: true,
					autoConnect: false,
				});

				// when connected, update message
				newSocket.on('connected', (data: { message: string }) => {
					dispatch({
						type: 'updateEmbedMsg',
						payload: { id, data: { description: data.message, color: EmbedColors.green } },
					});
				});

				newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: UserMessage) => writeMessage(msg));
				newSocket.connect();

				// save socket to state
				setSocket((currentSocket) => {
					currentSocket?.disconnect();
					return newSocket;
				});

				controllerRef.current = null;
			} catch (e) {
				console.log(e);
			}
		}

		createSocket();

		// cleanup
		return () => {
			socket?.disconnect();
			dispatch({ type: 'clear' });
		};
	}, [status]);

	const providerData: SocketProviderIface = Object.freeze({
		sendMessage,
		dispatch,
		messageList,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
