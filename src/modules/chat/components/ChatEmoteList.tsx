import React, { useMemo } from 'react';
import { styled, theme } from 'stiches.config';

import { moveIn } from '../styles';
import { EmoteComponents, EmoteKeys } from '../utils/ChatEmotes';

const Container = styled('div', {
	padding: '.5rem',
	backgroundColor: theme.colors.grey900,
	animation: `${moveIn} .2s`,
	h2: {
		marginTop: 0,
	},
	'.emotes': {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '.5rem',
	},
});

const EmoteButton = styled('div', {
	display: 'inline-block',
	height: '100%',
	minHeight: 32,
	marginRight: '1rem',
	cursor: 'pointer',
});

const ChatEmoteList = ({ insertEmote }: { insertEmote: (emoteKey: string) => void }) => {
	// wrap emotes in clickable buttons
	const emoteButtons = useMemo(() => {
		return EmoteKeys.map((emoteKey, i) => (
			<EmoteButton key={i} title={emoteKey} onClick={() => insertEmote(emoteKey)}>
				{EmoteComponents[emoteKey]}
			</EmoteButton>
		));
	}, [insertEmote]);

	return (
		<Container>
			<h2>Emotes</h2>
			<div className='emotes'>{emoteButtons}</div>
		</Container>
	);
};

export default ChatEmoteList;
