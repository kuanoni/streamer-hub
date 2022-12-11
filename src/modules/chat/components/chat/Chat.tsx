import { styled } from 'stiches.config';
import React, { useState } from 'react';
import SocketProvider from '../context/SocketProvider';
import ChatInput from './ChatInput';
import ChatSigninPrompt from './ChatSigninPrompt';
import ChatControlsBottom from './ChatControlsBottom';
import ChatControlsTop from './ChatControlsTop';
import ChatOptions from './chatOptions/components/ChatOptions';
import ChatOptionsProvider from './chatOptions/components/context/ChatOptionsProvider';
import ChatMessageList from './chatMessages/ChatMessageList';

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

const MessagesSection = styled('div', {
	position: 'relative',
	height: '100%',
	minHeight: 0,
});

export const Chat = () => {
	const [isEmotesOpen, setIsEmotesOpen] = useState(false);
	const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(false);
	const [isSigninPromptOpen, setIsSigninPromptOpen] = useState(false);

	const closePopup = () => {
		setIsEmotesOpen(false);
	};

	return (
		<Container>
			<SocketProvider>
				{isSigninPromptOpen && <ChatSigninPrompt setIsOpen={setIsSigninPromptOpen} />}
				<ChatControlsTop />
				<ChatOptionsProvider>
					<MessagesSection>
						<ChatMessageList closePopup={closePopup} />
						{isChatOptionsOpen && <ChatOptions setIsChatOptionsOpen={setIsChatOptionsOpen} />}
					</MessagesSection>
				</ChatOptionsProvider>
				<ChatInput
					isEmotesOpen={isEmotesOpen}
					setIsEmotesOpen={setIsEmotesOpen}
					setIsSigninPromptOpen={setIsSigninPromptOpen}
				/>
				<ChatControlsBottom setIsChatOptionsOpen={setIsChatOptionsOpen} />
			</SocketProvider>
		</Container>
	);
};
