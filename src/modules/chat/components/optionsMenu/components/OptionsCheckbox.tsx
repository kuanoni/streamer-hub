import React, { PropsWithChildren } from 'react';
import { BsCheckSquareFill } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

const Checkbox = styled('button', {
	position: 'relative',
	width: '1rem',
	height: '1rem',
	padding: 0,
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	variants: {
		active: {
			true: {
				'&::after': {
					backgroundColor: theme.colors.textLight,
				},
			},
			false: {
				'&::after': {
					backgroundColor: theme.colors.primary200,
				},
			},
		},
	},
	'&::after': {
		content: '',
		position: 'absolute',
		top: '.25rem',
		right: '.25rem',
		width: '50%',
		height: '50%',
		backgroundColor: theme.colors.primary200,
		transition: 'background-color .1s ease',
	},
	svg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		color: theme.colors.primary200,
		zIndex: 1,
	},
});

const Container = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '.5rem',
	padding: '.25rem .5rem',
	cursor: 'pointer',
	userSelect: 'none',
	'&:hover': {
		backgroundColor: theme.colors.grey800,
	},
});

type Props = {
	optionKey: string;
	value: boolean;
	setValue(key: string, value: string | boolean): void;
};

const OptionsCheckbox = React.memo(({ optionKey, value, setValue, children: label }: PropsWithChildren<Props>) => {
	const onClick = () => {
		setValue(optionKey, !value);
	};

	return (
		<Container onClick={onClick}>
			<Checkbox active={value}>
				<BsCheckSquareFill />
			</Checkbox>
			<span>{label}</span>
		</Container>
	);
});

OptionsCheckbox.displayName = 'OptionsCheckbox';

export default OptionsCheckbox;
