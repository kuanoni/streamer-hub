import React, { useEffect, useState } from 'react';
import { Message, MessageWithoutTime } from 'types/socketio';
import SocketIO, { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import SocketContext from './SocketContext';
import { SocketIface } from './SocketIface';
import { MessageType, SocketEvents } from '../../common';

interface Props {
	children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<Array<Message>>([]);

	const writeMessage = (msg: Message) => {
		setMessageLogs((currentMessages) => [...currentMessages, msg]);
	};

	const sendMessage = (msg: MessageWithoutTime) => {
		if (!data?.user) return;
		socket?.emit(SocketEvents.CLIENT_SEND_MSG, msg, (res: { status: boolean }) => {
			if (!res) console.log('Failed to send chat message.');
		});
	};

	useEffect(() => {
		const msg: Message = {
			type: MessageType.INFO,
			time: new Date().toISOString(),
			author: 'INFO',
			text: 'Attempting to connect...',
		};
		writeMessage(msg);

		// make sure the server is running
		fetch('/api/socket');
		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { role: data?.user?.role } });

		newSocket.on(SocketEvents.CLIENT_RECEIVE_MSG, (msg: Message) => writeMessage(msg));
		newSocket.connect();

		setSocket((currentSocket) => {
			currentSocket?.disconnect();
			return newSocket;
		});

		return () => {
			// cleanup
			newSocket?.disconnect();
			setMessageLogs([]);
		};
	}, [data?.user?.role]);

	const providerData: SocketIface = Object.freeze({
		socket,
		messageLogs,
		writeMessage,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
