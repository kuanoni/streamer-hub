import React from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessages from './ChatMessages';
import MessageSendForm from './MessageSendForm';

export const ChatBox = () => {
	return (
		<SocketProvider>
			<MessageSendForm />
			<ChatMessages />
		</SocketProvider>
	);
};
