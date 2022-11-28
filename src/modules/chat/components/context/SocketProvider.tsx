import React, { useEffect, useState } from 'react';
import { Message } from 'types/socketio';
import SocketIO, { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import SocketContext from './SocketContext';
import { SocketIface } from './SocketIface';
import { MessageType } from '../../common';

interface Props {
	children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<Array<Message>>([]);

	const createMessage = (type: MessageType, author: string, text: string): Message => {
		return { type, time: new Date(), author, text };
	};

	const writeMessage = (msg: Message) => {
		setMessageLogs((currentMessages) => [...currentMessages, msg]);
	};

	const sendMessage = (msg: Message) => {
		if (!data?.user) return;
		socket?.emit('createdMessage', msg, (res: { status: boolean }) => {
			if (!res) console.log('Failed to send chat message.');
		});
	};

	useEffect(() => {
		// make sure the server is running
		fetch('/api/socket');
		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { role: data?.user?.role } });

		const incomingMessage = (msg: Message) => {
			writeMessage(msg);
		};

		const connect = () => {
			if (data?.user) {
				const msg = createMessage(MessageType.INFO, 'INFO', data.user.displayName + ' has connected.');
				writeMessage(msg);
			}
		};

		newSocket.on('incomingMessage', incomingMessage);
		newSocket.on('connect', connect);

		setSocket((currentSocket) => {
			currentSocket?.disconnect();
			return newSocket;
		});

		newSocket.connect();

		return () => {
			newSocket?.disconnect();
		};
	}, [data?.user?.role]);

	const providerData: SocketIface = Object.freeze({
		socket,
		messageLogs,
		createMessage,
		writeMessage,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
