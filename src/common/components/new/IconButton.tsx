import React, { useMemo } from 'react';
import { styled, theme } from 'stiches.config';

const Container = styled('button', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 0,
	margin: 0,
	height: 36,
	width: 36,
	border: 'none',
	borderRadius: 10,
	color: theme.colors.grey500,
	backgroundColor: 'transparent',
	cursor: 'pointer',
	transition: 'background-color .1s ease-out, color .1s ease-out',
	svg: {
		width: '55%',
		height: '55%',
	},
	'&:hover': {
		color: theme.colors.grey300,
		backgroundColor: theme.colors.action,
	},
	'&:active': {
		color: theme.colors.primary400,
		backgroundColor: theme.colors.cover,
	},
});

const IconButton = ({
	onClick,
	size,
	children,
}: {
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
	size?: number;
	children: React.ReactNode;
}) => {
	const css = useMemo(() => {
		if (!size) return {};

		return {
			width: size,
			height: size,
		};
	}, [size]);

	return (
		<Container css={css} onClick={onClick}>
			{children}
		</Container>
	);
};

export default IconButton;
