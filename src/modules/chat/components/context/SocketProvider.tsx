import Joi from 'joi';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';

import { Rank } from '@globalTypes/custom-auth';
import { ClientMessage, ClientOnlyMessage, ServerMessage } from '@globalTypes/socketio';

import { MessageScope, MessageType, SocketEvents } from '../../common';
import SocketContext, { SocketProviderIface } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<(ClientMessage | ClientOnlyMessage)[]>([]);

	// saves msg to messageLogs, which is a list that renders in MessageBox
	const writeMessage = (msg: ClientMessage) => {
		setMessageLogs((currentMessages) => {
			if (currentMessages.length < 50) return [...currentMessages, msg];
			else return [...currentMessages.slice(1), msg];
		});
	};

	const writeClientMessage = (msg: ClientOnlyMessage) => {
		setMessageLogs((currentMessages) => {
			if (currentMessages.length < 50) return [...currentMessages, msg];
			else return [...currentMessages.slice(1), msg];
		});
	};

	// send msg over socket connection
	const sendMessage = (msg: ServerMessage) => {
		if (!data?.user) return;
		socket?.emit(SocketEvents.CLIENT_SEND_MSG, msg, sendMessageErrorHandler);
	};

	const sendMessageErrorHandler = (res: { ok: boolean; errors: Joi.ValidationErrorItem[] }) => {
		if (res.ok) return;

		res.errors.forEach((error) => {
			switch (error.context?.key) {
				case 'author': {
					console.log('Your username is missing!');
					const msg: ClientOnlyMessage = {
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
		const msg: ClientOnlyMessage = {
			scope: MessageScope.CLIENT,
			type: MessageType.INFO,
			time: new Date().toISOString(),
			text: 'Attempting to connect...',
		};

		writeClientMessage(msg);

		// make sure the server is running
		fetch('/api/socket');

		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { role: data?.user?.role } });
		newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: ClientMessage) => writeMessage(msg));
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
	}, [data?.user?.role]);

	const providerData: SocketProviderIface = Object.freeze({
		messageLogs,
		writeMessage,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
