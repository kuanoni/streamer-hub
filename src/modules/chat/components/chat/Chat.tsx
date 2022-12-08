import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import ChatSigninPrompt from './ChatSigninPrompt';
import ChatControlsTop from './ChatControlsTop';
import ChatControlsBottom from './ChatControlsBottom';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minWidth: 300,
	width: 300,
	background: 'linear-gradient(rgba(63, 88, 148, 0.05) 0%, rgba(63, 88, 148, 0.05) 100%)',
	overflow: 'auto',
});

export const Chat = () => {
	const [isEmotesOpen, setIsEmotesOpen] = useState(false);
	const [isSigninPromptOpen, setIsSigninPromptOpen] = useState(false);

	const closePopup = () => {
		setIsEmotesOpen(false);
	};

	return (
		<Container>
			<SocketProvider>
				{isSigninPromptOpen && <ChatSigninPrompt setIsOpen={setIsSigninPromptOpen} />}
				<ChatControlsTop />
				<ChatMessageList closePopup={closePopup} />
				<ChatInput
					isEmotesOpen={isEmotesOpen}
					setIsEmotesOpen={setIsEmotesOpen}
					setIsSigninPromptOpen={setIsSigninPromptOpen}
				/>
				<ChatControlsBottom />
			</SocketProvider>
		</Container>
	);
};
