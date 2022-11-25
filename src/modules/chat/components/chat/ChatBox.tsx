import { styled } from 'stiches.config';
import React from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessages from './ChatMessages';
import MessageSendForm from './MessageSendForm';

const StyledContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minWidth: 300,
});

export const ChatBox = () => {
	return (
		<StyledContainer>
			<SocketProvider>
				<ChatMessages />
				<MessageSendForm />
			</SocketProvider>
		</StyledContainer>
	);
};
