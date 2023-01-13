import React, { useState } from 'react';
import { styled, theme } from 'stiches.config';

const InputWrapper = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: '.5rem',
	outlineColor: 'transparent',
	outlineStyle: 'solid',
	outlineWidth: 1,
	outlineOffset: -1,
	transition: 'outline-color .2s ease',

	variants: {
		color: {
			dark: {
				color: theme.colors.textMedium,
				backgroundColor: theme.colors.grey900,
				borderRight: `1px solid ${theme.colors.grey800}`,
				borderBottom: `1px solid ${theme.colors.grey800}`,
				'&.focus': {
					color: theme.colors.textMediumActive,
					outlineColor: theme.colors.grey400,
				},

				'&.disabled': {
					color: theme.colors.textDark,
					backgroundColor: theme.colors.primary1400,
				},
			},
			transparent: {
				color: theme.colors.textLight,
				backgroundColor: 'transparent',
				border: 'none',
				borderRadius: theme.space.borderRad,
				outlineStyle: 'ridge',
				outlineOffset: 2,
				outlineWidth: 2,
				'&.focus': {
					outlineColor: theme.colors.textMedium,
				},
			},
		},
		size: {
			form: {
				marginLeft: -2,
				padding: '.4rem',
				borderRadius: theme.space.borderRadHalf,
				fontSize: '1rem',
			},
			small: {
				height: '2em',
				padding: '.25rem',
				borderRadius: theme.space.borderRadHalf,
			},
			huge: {
				height: '1em',
				padding: 0,
				fontSize: '3rem',
				fontWeight: 700,
			},
		},
	},
});

const Input = styled('input', {
	width: '100%',
	margin: 0,
	padding: 0,
	fontSize: 'inherit',
	fontFamily: 'inherit',
	color: 'inherit',
	backgroundColor: 'transparent',
	caretColor: 'inherit',
	border: 'none',
	outline: 'none',
});

interface Props {
	value: string;
	setValue: Function;
	placeholder?: string;
	disabled?: boolean;
	autoFocus?: boolean;
	maxLength?: number;
	color?: 'dark' | 'transparent';
	size?: 'form' | 'small' | 'huge';
}

const TextInput = ({
	value,
	setValue,
	placeholder,
	disabled = false,
	autoFocus = false,
	maxLength,
	color = 'dark',
	size = 'form',
	children,
}: React.PropsWithChildren<Props>) => {
	const [isFocused, setIsFocused] = useState(false);

	const containerClassName = `${isFocused ? 'focus' : ''} ${disabled ? 'disabled' : ''}`;

	const handleFocus = (e: React.FocusEvent) => {
		const wasFocused = e.type === 'focus';
		setIsFocused(wasFocused);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<InputWrapper className={containerClassName} color={color} size={size}>
			{children}
			<Input
				type={'text'}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleFocus}
				placeholder={placeholder}
				disabled={disabled}
				autoFocus={autoFocus}
				maxLength={maxLength || 999}
			/>
		</InputWrapper>
	);
};

export default TextInput;
