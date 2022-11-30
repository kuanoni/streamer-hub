import React, { useMemo } from 'react';
import { keyframes, styled, theme } from 'stiches.config';
import { MessageBoxContainer } from '../../styles';
import { EmoteKeys, Emotes } from '../../utils/ChatEmotes';

const Container = styled(MessageBoxContainer, {
	padding: '.5rem',
	backgroundColor: theme.colors.bgDarker,
	border: '1px solid ' + theme.colors.bgDark,
	zIndex: 1,
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

const ChatEmoteList = ({ emotePicked }: { emotePicked: Function }) => {
	const emoteButtons = useMemo(() => {
		return EmoteKeys.map((emoteKey, i) => (
			<EmoteButton key={i} title={emoteKey} onClick={() => emotePicked(emoteKey)}>
				{Emotes[emoteKey]}
			</EmoteButton>
		));
	}, []);

	return (
		<Container>
			<h2>Emotes</h2>
			<div className='emotes'>{emoteButtons}</div>
		</Container>
	);
};

export default ChatEmoteList;
