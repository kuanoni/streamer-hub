import { MouseEventHandler, PropsWithChildren } from 'react';
import { styled, theme } from 'stiches.config';

const Btn = styled('button', {
	color: theme.colors.textLight,
	border: 'none',
	borderRadius: theme.space.borderRad,
	fontSize: '1rem',
	fontWeight: 700,
	cursor: 'pointer',
	transition: '.1s ease',
	'&:active': {
		transitionDuration: '0s',
	},

	variants: {
		color: {
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
		},
		content: {
			text: {
				padding: '.5rem 2.25rem',
			},
			icon: {
				position: 'relative',
				padding: 0,
				margin: 0,
				svg: {
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					width: '55%',
					height: '55%',
				},
			},
		},
		size: {
			icon: {
				height: 36,
				width: 36,
			},
			fill: {
				width: '100%',
				height: '100%',
			},
			'2em': {
				width: '2em',
				height: '2em',
			},
		},
	},
});

interface Props {
	color?: 'primary' | 'secondary' | 'primaryTransparent' | 'dark';
	content?: 'text' | 'icon';
	size?: 'icon' | 'fill' | '2em' | undefined;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ color = 'primary', content = 'text', size, onClick, children: label }: PropsWithChildren<Props>) => {
	return (
		<Btn color={color} content={content} size={size} onClick={onClick}>
			{label}
		</Btn>
	);
};

export default Button;
