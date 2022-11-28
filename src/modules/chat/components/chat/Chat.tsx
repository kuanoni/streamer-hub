import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessages from './MessageBox';
import MessageSendForm from './MessageSendForm';
import EmoteSelector from './EmoteSelector';

const StyledContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minWidth: 300,
	width: 300,
	backgroundColor: '$bgDarkest',
	border: '1px solid $bgDark',
	overflow: 'auto',
});

export const Chat = () => {

	return (
		<StyledContainer>
			<SocketProvider>
			</SocketProvider>
		</StyledContainer>
	);
};
