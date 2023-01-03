import React, { useRef, useState } from 'react';
import { styled, theme } from 'stiches.config';

import { ChatPopups } from '../common';
import ChatControlsBottom from './ChatControlsBottom';
import ChatControlsTop from './ChatControlsTop';
import ChatEmoteList from './ChatEmoteList';
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
	'&:not(:empty)': {},
});

export const Chat = () => {
	const [popupOpen, setPopupOpen] = useState<ChatPopups>(ChatPopups.NONE);
	const inputRef: React.RefObject<(emoteKey: string) => void> = useRef(null);

	const togglePopup = (popup: ChatPopups) => {
		if (popup === popupOpen) setPopupOpen(ChatPopups.NONE);
		else setPopupOpen(popup);
	};

	const closePopup = () => setPopupOpen(ChatPopups.NONE);

	return (
		<Container>
			{popupOpen === ChatPopups.SIGNIN && <ChatSigninPrompt closePopup={closePopup} />}
			<ChatControlsTop />
			<SocketProvider>
				<ChatOptionsProvider>
					<MessagesSection>
						<ChatMessageList closePopup={closePopup} hide={false} />
						<Popups>
							{popupOpen === ChatPopups.OPTIONS && <ChatOptions closePopup={closePopup} />}
							{popupOpen === ChatPopups.EMOTES && (
								<ChatEmoteList insertEmote={inputRef.current || (() => {})} />
							)}
						</Popups>
					</MessagesSection>
				</ChatOptionsProvider>
				<ChatInput ref={inputRef} popupOpen={popupOpen} togglePopup={togglePopup} closePopup={closePopup} />
			</SocketProvider>
			<ChatControlsBottom togglePopup={togglePopup} />
		</Container>
	);
};
