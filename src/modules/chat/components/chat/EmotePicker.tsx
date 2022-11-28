import React from 'react';
import { keyframes, styled, theme } from 'stiches.config';
import { MessageBoxContainer } from '../../styles';

const open = keyframes({
	'0%': { transform: 'scale(1)' },
	'100%': { transform: 'scale(1.5)' },
});

const StyledContainer = styled(MessageBoxContainer, {
	height: 200,
	padding: '.5rem',
	backgroundColor: theme.colors.bgDarker,
	border: '1px solid ' + theme.colors.bgDark,
	zIndex: 1,
});

const EmotePicker = () => {
	return <StyledContainer>ChatEmotes</StyledContainer>;
};

export default EmotePicker;
