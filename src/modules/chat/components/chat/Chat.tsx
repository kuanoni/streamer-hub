import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { useSession } from 'next-auth/react';
import ChatSigninPrompt from './ChatSigninPrompt';

const Container = styled('div', {
	position: 'relative',
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
	const [isEmotesOpen, setIsEmotesOpen] = useState(false);
	const [isSigninPromptOpen, setIsSigninPromptOpen] = useState(true);

	const closePopup = () => {
		setIsEmotesOpen(false);
	};

	return (
		<Container>
			<SocketProvider>
				{isSigninPromptOpen && <ChatSigninPrompt setIsOpen={setIsSigninPromptOpen} />}
				<ChatMessageList closePopup={closePopup} />
				<ChatInput
					isEmotesOpen={isEmotesOpen}
					setIsEmotesOpen={setIsEmotesOpen}
					setIsSigninPromptOpen={setIsSigninPromptOpen}
				/>
			</SocketProvider>
		</Container>
	);
};
