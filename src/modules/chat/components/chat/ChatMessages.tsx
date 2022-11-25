import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';

const ChatMessages = () => {
	const socket = useContext(SocketContext);

	return (
		<div>
			{socket?.messageLogs.map((msg) => {
				const dateString = new Date(msg.time).toISOString();
				return <ChatMessage key={dateString} msg={msg} />;
			})}
		</div>
	);
};

export default ChatMessages;
