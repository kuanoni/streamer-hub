import React from 'react';
import { styled } from 'stiches.config';

import { EmoteComponents, EmoteKeys } from '../utils/ChatEmotes';
import ChatPopup from './ChatPopup';

const EmotesContainer = styled('div', {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '.5rem',
	padding: '.5rem',
});

const EmoteButton = styled('div', {
	display: 'inline-block',
	height: '100%',
	minHeight: 32,
	marginRight: '1rem',
	cursor: 'pointer',
});

type Props = {
	closePopup: () => void;
	insertEmote: (emoteKey: string) => void;
};

const ChatEmoteList = ({ closePopup, insertEmote }: Props) => {
	return (
		<ChatPopup>
			<ChatPopup.Header title='Emotes' closePopup={closePopup}></ChatPopup.Header>
			<ChatPopup.Content>
				<EmotesContainer>
					{EmoteKeys.map((emoteKey, i) => (
						<EmoteButton key={i} title={emoteKey} onClick={() => insertEmote(emoteKey)}>
							{EmoteComponents[emoteKey]}
						</EmoteButton>
					))}
				</EmotesContainer>
			</ChatPopup.Content>
		</ChatPopup>
	);
};

export default ChatEmoteList;
