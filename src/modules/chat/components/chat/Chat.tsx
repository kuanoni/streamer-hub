import React, { useState } from 'react';
import { styled } from 'stiches.config';

import SocketProvider from '../context/SocketProvider';
import ChatControlsBottom from './ChatControlsBottom';
import ChatControlsTop from './ChatControlsTop';
import ChatInput from './ChatInput';
import ChatMessageList from './chatMessages/ChatMessageList';
import ChatOptions from './chatOptions/components/ChatOptions';
import ChatOptionsProvider from './chatOptions/components/context/ChatOptionsProvider';
import ChatSigninPrompt from './ChatSigninPrompt';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minWidth: 300,
	width: 300,
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
						<ChatMessageList closePopup={closePopup} hide={isChatOptionsOpen} />
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
