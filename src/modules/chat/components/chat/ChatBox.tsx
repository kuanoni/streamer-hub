import { styled } from 'stiches.config';
import React from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessages from './ChatMessages';
import MessageSendForm from './MessageSendForm';

const StyledContainer = styled('div', {});

export const ChatBox = () => {
	return (
		<SocketProvider>
			<MessageSendForm />
			<ChatMessages />
		</SocketProvider>
	);
};
