import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
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
				<ChatMessageList closePopup={closePopup} />
				{status === 'authenticated' && (
					<ChatInput isEmotesOpen={isEmotesOpen} setIsEmotesOpen={setIsEmotesOpen} />
				)}
			</SocketProvider>
		</StyledContainer>
	);
};
