import React, { useEffect, useState } from 'react';
import { Message } from 'types/socketio';
import SocketIO, { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import SocketContext from './SocketContext';
import { SocketIface } from './SocketIface';

interface Props {
	children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
	const { data, status } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageLogs, setMessageLogs] = useState<Array<Message>>([]);

	useEffect(() => {
		// make sure the server is running
		fetch('/api/socket');
		const newSocket = SocketIO({ forceNew: true, autoConnect: false, auth: { role: data?.user?.role } });

		const incomingPublicMessage = (msg: Message) => {
			setMessageLogs((currentMessages) => [...currentMessages, msg]);
		};

		newSocket.on('incomingPublicMessage', incomingPublicMessage);

		setSocket((currentSocket) => {
			currentSocket?.disconnect();
			return newSocket;
		});

		newSocket.connect();

		return () => {
			newSocket?.disconnect();
		};
	}, [data?.user?.role]);

	const sendMessage = (message: string) => {
		if (!data?.user) return;
		const msg = { author: data.user.displayName, text: message };

		socket?.emit('createdPublicMessage', msg, (res: { status: boolean }) => {
			if (!res) console.log('Failed to send chat message.');
		});
	};

	const providerData: SocketIface = Object.freeze({
		socket,
		messageLogs,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
