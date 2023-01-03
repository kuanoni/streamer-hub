import React, { useState } from 'react';
import { styled, theme } from 'stiches.config';

import { ChatPopups } from '../common';
import ChatControlsBottom from './ChatControlsBottom';
import ChatControlsTop from './ChatControlsTop';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';
import ChatSigninPrompt from './ChatSigninPrompt';
import SocketProvider from './context/SocketProvider';
import ChatOptions from './optionsMenu/components/ChatOptions';
import ChatOptionsProvider from './optionsMenu/components/context/ChatOptionsProvider';

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
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	minHeight: 0,
});

const Popups = styled('div', {
	'&:not(:empty)': {
		maxHeight: '65%',
		marginBottom: '1rem',
		boxShadow: `0 1px 10px 1px ${theme.colors.primary900}`,
	},
});

export const Chat = () => {
	const [isEmotesOpen, setIsEmotesOpen] = useState(false);
	const [isSigninPromptOpen, setIsSigninPromptOpen] = useState(false);

	const [popupOpen, setPopupOpen] = useState<ChatPopups>(ChatPopups.NONE);

	const openPopup = (popup: ChatPopups) => {
		if (popup === popupOpen) setPopupOpen(ChatPopups.NONE);
		else setPopupOpen(popup);
	};

	const closePopup = () => {
		setPopupOpen(ChatPopups.NONE);
	};

	return (
		<Container>
			{isSigninPromptOpen && <ChatSigninPrompt setIsOpen={setIsSigninPromptOpen} />}
			<ChatControlsTop />
			<SocketProvider>
				<ChatOptionsProvider>
					<MessagesSection>
						<Popups>{popupOpen === ChatPopups.OPTIONS && <ChatOptions closePopup={closePopup} />}</Popups>
						<ChatMessageList closePopup={closePopup} hide={false} />
						<Popups></Popups>
					</MessagesSection>
				</ChatOptionsProvider>
				<ChatInput
					isEmotesOpen={isEmotesOpen}
					setIsEmotesOpen={setIsEmotesOpen}
					setIsSigninPromptOpen={setIsSigninPromptOpen}
				/>
			</SocketProvider>
			<ChatControlsBottom openPopup={openPopup} />
		</Container>
	);
};
