import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import ChatSigninPrompt from './ChatSigninPrompt';
import ChatControls from './ChatControls';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minWidth: 300,
	width: 300,
	paddingLeft: '1rem',
	borderLeft: '1px solid $textDarker',
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

				<ChatControls />
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
