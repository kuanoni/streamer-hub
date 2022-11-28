import React, { useMemo } from 'react';
import { keyframes, styled, theme } from 'stiches.config';
import { MessageBoxContainer } from '../../styles';
import { EmoteKeys, Emotes } from '../../utils/Emotes';

const open = keyframes({
	'0%': { transform: 'scale(1)' },
	'100%': { transform: 'scale(1.5)' },
});

const StyledContainer = styled(MessageBoxContainer, {
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

const EmotePicker = ({ emotePicked }: { emotePicked: Function }) => {
	const emoteButtons = useMemo(() => {
		return EmoteKeys.map((emoteKey, i) => (
			<EmoteButton key={i} title={emoteKey} onClick={() => emotePicked(emoteKey)}>
				{Emotes[emoteKey](i)}
			</EmoteButton>
		));
	}, []);

	return (
		<StyledContainer>
			<h2>Emotes</h2>
			<div className='emotes'>{emoteButtons}</div>
		</StyledContainer>
	);
};

export default EmotePicker;
