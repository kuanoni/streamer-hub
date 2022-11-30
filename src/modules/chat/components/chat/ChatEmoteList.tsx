import React, { useMemo } from 'react';
import { keyframes, styled, theme } from 'stiches.config';
import { MessageBoxContainer } from '../../styles';
import { EmoteKeys, Emotes } from '../../utils/ChatEmotes';

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(25px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

const Container = styled(MessageBoxContainer, {
	padding: '.5rem',
	backgroundColor: theme.colors.bgDark,
	border: '1px solid ' + theme.colors.bg,
	animation: `${moveIn} .25s`,
	h2: {
		marginTop: 0,
	},
	'.emotes': {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
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
				{Emotes[emoteKey]}
			</EmoteButton>
		));
	}, [EmoteKeys]);

	return (
		<Container>
			<h2>Emotes</h2>
			<div className='emotes'>{emoteButtons}</div>
		</Container>
	);
};

export default ChatEmoteList;
