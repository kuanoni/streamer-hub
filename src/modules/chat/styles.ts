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

export const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(25px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

export const PopupContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	paddingBottom: '1rem',
	fontSize: '.9rem',
	animation: `${moveIn} .2s`,
});

export const PopupHeader = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	paddingLeft: '1rem',
	backgroundColor: theme.colors.primary900,
	borderBottom: `1px solid ${theme.colors.trinary700}`,
	h2: {
		margin: 0,
		fontSize: '1.25rem',
	},
});

export const CloseButton = styled('button', {
	height: '1.75rem',
	padding: 0,
	backgroundColor: 'transparent',
	border: 'none',
	color: theme.colors.textMedium,
	aspectRatio: 1,
	cursor: 'pointer',
	'&:hover': {
		color: theme.colors.textMediumActive,
	},
	svg: {
		width: '100%',
		height: '100%',
		aspectRatio: 1,
	},
});

export const PopupContent = styled('div', {
	height: '100%',
	padding: '.5rem 0',
	overflowY: 'scroll',
	scrollbarWidth: 'thin',
});

export const PopupSection = styled('div', {
	padding: '.5em 0',
	'.title': {
		padding: '0 .5em',
		paddingBottom: '.25em',
		color: theme.colors.textDark,
		fontSize: '.94em',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
});
