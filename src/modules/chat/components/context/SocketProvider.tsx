import React, { useEffect, useState } from 'react';
import { Message, MessageWithoutTime } from 'types/socketio';
import SocketIO, { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import SocketContext from './SocketContext';
import { SocketProviderIface } from './SocketProviderIface';
import { MessageType, SocketEvents } from '../../common';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<Array<Message>>([]);

	// saves msg to messageLogs, which is a list that renders in MessageBox
	const writeMessage = (msg: Message) => {
		setMessageLogs((currentMessages) => [...currentMessages, msg]);
	};

	// send msg over socket connection
	const sendMessage = (msg: MessageWithoutTime) => {
		if (!data?.user) return;
		socket?.emit(SocketEvents.CLIENT_SEND_MSG, msg, (res: { status: boolean }) => {
			if (!res) console.log('Failed to send chat message.');
		});
	};

	useEffect(() => {
		// write 'Attempting to connect...' message
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
		socket,
		messageLogs,
		writeMessage,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
