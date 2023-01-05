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
});

export const PopupHeaderTitle = styled('div', {
	h2: {
		display: 'inline',
		margin: 0,
		fontSize: '1.25rem',
	},
	h4: {
		display: 'inline',
		margin: 0,
		color: theme.colors.textMedium,
	},
});

export const PopupHeaderButtons = styled('div', {
	display: 'flex',
	gap: '1rem',
});

export const HeaderButton = styled('button', {
	height: '1.25rem',
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

export const PopupContentHeader = styled('div', {
	paddingTop: '.5rem',
});

export const PopupContent = styled('div', {
	height: '100%',
	padding: '.5rem 0',
	overflowY: 'auto',
	scrollbarWidth: 'thin',
});

export const PopupSection = styled('div', {
	'&:not(:empty)': {
		padding: '.5em 0',
	},
	'.title': {
		padding: '0 .5em',
		paddingBottom: '.25em',
		color: theme.colors.textDark,
		fontSize: '.94em',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
});
