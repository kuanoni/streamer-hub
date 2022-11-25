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
		const socket = SocketIO({ autoConnect: false, auth: { role: data?.user?.role } });

		const incomingMessage = (msg: Message) => {
			setMessageLogs((currentMessages) => [...currentMessages, msg]);
		};

		socket.on('incomingMessage', incomingMessage);

		setSocket(socket);

		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (status !== 'authenticated') return;

		socket?.connect();
	}, [socket, status]);

	const sendMessage = (message: string) => {
		if (!data?.user) return;
		const msg: Message = { time: new Date(), displayName: data.user.displayName, message };
		socket?.emit('createdMessage', msg);
	};

	const providerData: SocketIface = Object.freeze({
		socket,
		messageLogs: messageLogs,
		sendMessage,
	});

	return <SocketContext.Provider value={providerData}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
