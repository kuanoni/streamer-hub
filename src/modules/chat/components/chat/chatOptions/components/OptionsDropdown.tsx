import React, { FC, MouseEvent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { keyframes, styled, theme } from 'stiches.config';

const Container = styled('div', {
	padding: '.25rem .5rem',
	userSelect: 'none',
});

const InputBox = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	padding: '.25rem',
	color: theme.colors.textLight,
	backgroundColor: theme.colors.primary400,
	cursor: 'pointer',
});

const DropdownWrapper = styled('div', {
	position: 'relative',
	width: '100%',
	height: 0,
});

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'scaleY(95%)',
	},
	'100%': {
		opacity: 1,
		transform: 'scaleY(100%)',
	},
});

const Dropdown = styled('div', {
	display: 'none',
	position: 'absolute',
	left: 0,
	top: 0,
	width: '100%',
	backgroundColor: theme.colors.primary600,
	overflow: 'hidden',
	zIndex: 2,
	transformOrigin: 'top',
	transition: 'all .2s ease',
	'&::before': {
		content: '',
		position: 'absolute',
		width: '200%',
		height: '200%',
		marginLeft: '-50%',
		boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 3px 1px inset',
		pointerEvents: 'none',
	},
	'&.open': {
		display: 'block',
		animation: `${moveIn} .25s`,
	},
});

const DropdownOption = styled('div', {
	padding: '.25rem',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: theme.colors.primary700,
	},
	'&.selected': {
		textDecoration: 'underline',
		textDecorationStyle: 'dotted',
		backgroundColor: theme.colors.primary500,
	},
	'&.selected:hover': {
		backgroundColor: theme.colors.primary700,
	},
});

type Props = {
	optionKey: string;
	options: string[];
	value: string;
	setValue(key: string, value: string | boolean): void;
};

const OptionsDropdown: FC<PropsWithChildren<Props>> = ({ optionKey, options, value, setValue, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const changeValue = (e: Event | MouseEvent) => {
		if (!isOpen) return;
		const target = e.target as HTMLDivElement;

		if (options.includes(target.innerText)) setValue(optionKey, target.innerText);
		else console.log('Dropdown option not found');
	};

	const handleInputClick = (e: MouseEvent) => {
		setIsOpen(!isOpen);
		e.stopPropagation();
	};

	const handleDocumentClick = useCallback(() => setIsOpen(false), [setIsOpen]);

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);
		return () => document.removeEventListener('click', handleDocumentClick);
	}, [handleDocumentClick]);

	useEffect(() => {
		setIsOpen(false);
	}, [value, setIsOpen]);

	return (
		<Container>
			{children}
			<InputBox onClick={handleInputClick}>
				{value}
				<BsCaretDownFill />
			</InputBox>
			<DropdownWrapper>
				<Dropdown className={isOpen ? 'open' : ''}>
					{options.map((option) => (
						<DropdownOption
							key={option}
							className={option === value ? 'selected' : ''}
							onClick={changeValue}
						>
							{option}
						</DropdownOption>
					))}
				</Dropdown>
			</DropdownWrapper>
		</Container>
	);
};

export default OptionsDropdown;
