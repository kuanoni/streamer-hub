import { MouseEventHandler, PropsWithChildren } from 'react';
import { styled, theme } from 'stiches.config';

const Btn = styled('button', {
	color: theme.colors.textLight,
	backgroundColor: theme.colors.trinary700,
	border: 'none',
	borderRadius: theme.space.borderRad,
	fontSize: '1rem',
	fontWeight: 700,
	cursor: 'pointer',
	transition: '.1s ease',
	variants: {
		color: {
			primary: {
				color: theme.colors.textLight,
				backgroundColor: theme.colors.primary700,
				'&:hover': {
					boxShadow: `0 0 4px 1px ${theme.colors.primary400}`,
					backgroundColor: theme.colors.primary600,
				},
				'&:active': {
					transform: 'translateY(1px)',
					boxShadow: 'none',
					backgroundColor: theme.colors.primary800,
				},
			},
			dark: {
				color: theme.colors.grey700,
				backgroundColor: 'transparent',
				'&:hover': {
					color: theme.colors.grey300,
					backgroundColor: theme.colors.grey900,
				},
				'&:active': {
					color: theme.colors.primary500,
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
				height: 36,
				width: 36,
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
			fill: {
				width: '100%',
				height: '100%',
			},
		},
	},
});

interface Props {
	color?: 'primary' | 'dark';
	content?: 'text' | 'icon';
	size?: 'fill' | undefined;
	onClick: () => void;
}

const Button = ({ color = 'primary', content = 'text', onClick, size, children: label }: PropsWithChildren<Props>) => {
	return (
		<Btn color={color} content={content} size={size} onClick={onClick}>
			{label}
		</Btn>
	);
};

export default Button;
