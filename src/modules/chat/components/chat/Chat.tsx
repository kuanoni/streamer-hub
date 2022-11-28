import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessages from './MessageBox';
import MessageSendForm from './MessageSendForm';
import { useSession } from 'next-auth/react';

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
	const { status } = useSession();
	const [isEmotesOpen, setIsEmotesOpen] = useState(false);

	const closePopup = () => {
		setIsEmotesOpen(false);
	};

	return (
		<StyledContainer>
			<SocketProvider>
				<ChatMessages closePopup={closePopup} />
				{status === 'authenticated' && (
					<MessageSendForm isEmotesOpen={isEmotesOpen} setIsEmotesOpen={setIsEmotesOpen} />
				)}
			</SocketProvider>
		</StyledContainer>
	);
};
