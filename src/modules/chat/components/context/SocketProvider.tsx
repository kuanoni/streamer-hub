import Joi from 'joi';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';

import {
	CommandFromClient, MessageClientOnly, MessageClientToServer, MessageServerToClient
} from '@globalTypes/socketio';
import parseCommandText from '@modules/chat/utils/parseCommandText';

import { MessageScope, MessageType, SocketEvents } from '../../common';
import SocketContext, { SocketProviderIface } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<(MessageServerToClient | MessageClientOnly)[]>([]);

	// saves msg to messageLogs, which is a list that renders in MessageBox
	const writeMessage = (msg: MessageServerToClient) => {
		setMessageLogs((currentMessages) => {
			if (currentMessages.length < 50) return [...currentMessages, msg];
			else return [...currentMessages.slice(1), msg];
		});
	};

	// write message only on client side
	const writeClientMessage = (msg: MessageClientOnly) => {
		setMessageLogs((currentMessages) => {
			if (currentMessages.length < 50) return [...currentMessages, msg];
			else return [...currentMessages.slice(1), msg];
		});
	};

	// send msg over socket connection
	const sendMessage = (msg: MessageClientToServer) => {
		if (!data?.user || !socket) return;

		msg.text = msg.text.trim();

		if (msg.text.startsWith('/')) {
			const [name, params] = parseCommandText(msg.text);

			if (!name) {
				const msg: MessageClientOnly = {
					scope: MessageScope.CLIENT,
					type: MessageType.SERVER,
					time: new Date().toISOString(),
					text: ['Invalid command.'],
				};

				writeClientMessage(msg);
				return;
			}

			const commandMessage: CommandFromClient = {
				author: msg.author,
				name,
				params,
			};

			socket.emit(SocketEvents.CLIENT_SEND_COMMAND, commandMessage);
			return;
		}
		socket.emit(SocketEvents.CLIENT_SEND_MSG, msg, sendMessageErrorHandler);
	};

	const sendCommandErrorHandler = (res: { ok: boolean; error: string }) => {
		if (res.ok) return;

		const msg: MessageClientOnly = {
			scope: MessageScope.CLIENT,
			type: MessageType.SERVER,
			time: new Date().toISOString(),
			text: res.error,
		};

		writeClientMessage(msg);
	};

	const sendMessageErrorHandler = (res: { ok: boolean; errors: Joi.ValidationErrorItem[] }) => {
		if (res.ok) return;

		res.errors.forEach((error) => {
			switch (error.context?.key) {
				case 'author': {
					console.log('Your username is missing!');
					const msg: MessageClientOnly = {
						scope: MessageScope.CLIENT,
						type: MessageType.SERVER,
						time: new Date().toISOString(),
						text: [
							'Your username is missing! Click',
							<Link key='link' href={'/profile'}>
								here
							</Link>,
							'to set a username.',
						],
					};

					writeClientMessage(msg);
				}
			}
		});
	};

	useEffect(() => {
		// write 'Attempting to connect...' message
		const msg: MessageClientOnly = {
			scope: MessageScope.CLIENT,
			type: MessageType.INFO,
			time: new Date().toISOString(),
			text: 'Attempting to connect...',
		};

		writeClientMessage(msg);

		// make sure the server is running
		fetch('/api/socket');

		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { authLevel: data?.user?.authLevel } });
		newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: MessageServerToClient) => writeMessage(msg));
		newSocket.connect();

		// save socket to state
		setSocket((currentSocket) => {
			currentSocket?.disconnect();
			return newSocket;
		});

		// cleanup
		return () => {
			newSocket?.disconnect();
			setMessageLogs([]);
		};
	}, [data?.user?.authLevel]);

	const providerData: SocketProviderIface = Object.freeze({
		messageLogs,
		writeMessage,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
