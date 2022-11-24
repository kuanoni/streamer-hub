import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import React, { useEffect, useState } from 'react';
import { Message } from 'types/socketio';
import SocketIO, { Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

const Chat = () => {
	const { data } = useSession();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Array<Message>>([]);
	const [outgoingMessage, setOutgoingMessage] = useState<string>('');

	const sendMessage = () => {
		if (!data?.user) return;
		const msg: Message = { time: new Date(), displayName: data.user.displayName, message: outgoingMessage };
		setOutgoingMessage('');
		socket?.emit('createdMessage', msg);
	};

	useEffect(() => {
		let socket: Socket;
		const socketInitializer = async () => {
			await fetch('/api/socket');
		};

		socketInitializer();

		socket = SocketIO();

		socket.on('incomingMessage', (msg: Message) => {
			setMessages((currentMessages) => [...currentMessages, msg]);
		});

		setSocket(socket);

		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			<h1>Chat</h1>
			<input
				type='text'
				value={outgoingMessage}
				onChange={(e) => setOutgoingMessage(e.target.value)}
				disabled={!data?.user}
			/>
			<button onClick={sendMessage} disabled={!data?.user}>
				Send
			</button>
			<div>
				{messages.map((msg, i) => (
					<div key={i}>{msg.time + ' | ' + msg.displayName + ' | ' + msg.message}</div>
				))}
			</div>
		</div>
	);
};

export default Chat;

Chat.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
