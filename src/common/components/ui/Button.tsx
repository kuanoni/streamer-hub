import { MouseEventHandler, PropsWithChildren } from 'react';
import { styled, theme } from 'stiches.config';

import { CSS } from '@stitches/react';

const buttonColorVariants = {
	primary: {
		color: theme.colors.textLight,
		backgroundColor: theme.colors.primary200,
		'&:hover': {
			backgroundColor: theme.colors.primary100,
		},
		'&:active': {
			transform: 'translateY(1px)',
			boxShadow: 'none',
			backgroundColor: theme.colors.primary300,
		},
	},
	secondary: {
		color: theme.colors.textLight,
		backgroundColor: theme.colors.secondary900,
		'&:hover': {
			backgroundColor: theme.colors.primary100,
		},
		'&:active': {
			transform: 'translateY(1px)',
			boxShadow: 'none',
			backgroundColor: theme.colors.primary200,
		},
	},
	primaryTransparent: {
		color: theme.colors.textLight,
		backgroundColor: 'transparent',
		border: `1px solid ${theme.colors.primary200}`,
		'&:hover': {
			backgroundColor: theme.colors.primary100,
		},
		'&:active': {
			transform: 'translateY(1px)',
			boxShadow: 'none',
			backgroundColor: theme.colors.primary300,
		},
	},
	dark: {
		color: theme.colors.textDark,
		backgroundColor: 'transparent',
		'&:hover': {
			color: theme.colors.textDarkActive,
			backgroundColor: theme.colors.grey700,
		},
		'&:active': {
			color: theme.colors.textPrimaryMedium,
			backgroundColor: theme.colors.grey800,
		},
	},
};

export type ButtonColors = keyof typeof buttonColorVariants;

const Btn = styled('button', {
	padding: 0,
	margin: 0,

	color: theme.colors.textLight,
	border: 'none',
	borderRadius: theme.space.borderRad,
	fontSize: '1em',
	fontWeight: 700,
	cursor: 'pointer',
	transition: '.1s ease',
	'&:active': {
		transitionDuration: '0s',
	},
	variants: {
		color: buttonColorVariants,
	},
});

interface Props {
	css?: CSS;
	className?: string;
	color?: 'primary' | 'secondary' | 'primaryTransparent' | 'dark';
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	css = {},
	className = '',
	color = 'primary',
	onClick,
	children: label,
}: PropsWithChildren<Props>) => {
	return (
		<Btn className={className} color={color} css={css} onClick={onClick}>
			{label}
		</Btn>
	);
};

export default Button;
