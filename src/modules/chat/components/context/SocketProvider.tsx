import Joi from 'joi';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';

import { Rank } from '@globalTypes/custom-auth';
import { ClientMessage, ServerMessage } from '@globalTypes/socketio';

import { MessageType, SocketEvents } from '../../common';
import SocketContext, { SocketProviderIface } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<Array<ClientMessage>>([]);

	// saves msg to messageLogs, which is a list that renders in MessageBox
	const writeMessage = (msg: ClientMessage) => {
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
				}
			}
		});
	};

	useEffect(() => {
		// write 'Attempting to connect...' message
		const msg: ClientMessage = {
			type: MessageType.INFO,
			time: new Date().toISOString(),
			author: 'INFO',
			rank: Rank.DEFAULT,
			text: 'Attempting to connect...',
		};
		writeMessage(msg);

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
