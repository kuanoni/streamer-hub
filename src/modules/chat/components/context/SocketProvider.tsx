import Joi from 'joi';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import SocketIO, { Socket } from 'socket.io-client';

import parseCommandText from '@modules/chat/utils/parseCommandText';

import { SocketEvents } from '../../common';
import SocketContext, { SocketProviderIface } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<UserMessage[]>([]);

	// saves msg to messageLogs, which is a list that renders in MessageBox
	const writeMessage = (msg: UserMessage) => {
		setMessageLogs((currentMessages) => {
			if (currentMessages.length < 50) return [...currentMessages, msg];
			else return [...currentMessages.slice(1), msg];
		});
	};

	// send msg over socket connection
	const sendMessage = (msg: UserMessageToServer) => {
		if (!data?.user || !socket) return;

		msg.data = msg.data.trim();

		if (msg.data.startsWith('/')) {
			const [name, params] = parseCommandText(msg.data);

			if (!name) {
				console.log('Invalid command');

				return;
			}

			const commandMessage: CommandMessage = {
				name,
				params,
			};

			socket.emit(SocketEvents.CLIENT_SEND_COMMAND, commandMessage);
			return;
		}

		socket.emit(SocketEvents.CLIENT_SEND_MSG, msg);
	};

	useEffect(() => {
		// make sure the server is running
		fetch('/api/socket');

		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { authLevel: data?.user?.authLevel } });
		newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: UserMessage) => writeMessage(msg));
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
