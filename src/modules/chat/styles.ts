import Image from 'next/image';
import { keyframes, styled, theme } from 'stiches.config';

export const MessageBoxContainer = styled('div', {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: '.5rem',
});

export const StyledEmote = styled(Image, {
	margin: '-.5rem 0',
	maxHeight: 32,
});

export const AbsoluteContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	height: '100%',
});

export const CustomScrollbar = {
	scrollbarWidth: 'thin',
	scrollbarColor: `${theme.colors.primary400} ${theme.colors.grey800}`,
	'&::-webkit-scrollbar': {
		width: 8,
		color: theme.colors.primary400,
		backgroundColor: theme.colors.grey800,
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: theme.colors.primary400,
	},
};
