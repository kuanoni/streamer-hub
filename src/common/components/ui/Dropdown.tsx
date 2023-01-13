import React, {
	Dispatch, MouseEvent, PropsWithChildren, ReactNode, SetStateAction, useCallback, useEffect,
	useState
} from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { keyframes, styled, theme } from 'stiches.config';

const Container = styled('div', {
	width: 'fit-content',
	userSelect: 'none',
});

const Input = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.25rem',
	fontWeight: 700,
	cursor: 'pointer',
	variants: {
		color: {
			primary: {
				color: theme.colors.textLight,
				backgroundColor: theme.colors.primary200,
			},
			dark: {
				color: theme.colors.textDark,
				backgroundColor: 'transparent',
				'&:hover, &.open': {
					color: theme.colors.textMedium,
					backgroundColor: theme.colors.grey800,
				},
			},
		},
	},
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

const ContainerBelowInput = styled('div', {
	position: 'relative',
	height: 0,
	zIndex: 1,
});

const OptionsContainer = styled('div', {
	visibility: 'hidden',
	overflow: 'hidden',
	zIndex: 2,
	pointerEvents: 'none',
	transformOrigin: 'top',
	transition: 'opacity .2s ease, transform .2s ease',
	variants: {
		color: {
			primary: {
				backgroundColor: theme.colors.primary400,
			},
			dark: {
				backgroundColor: theme.colors.grey700,
			},
		},
	},

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
		visibility: 'visible',
		animation: `${moveIn} .25s`,
		pointerEvents: 'auto',
	},
});

const Option = styled('div', {
	padding: '.25rem',
	paddingRight: '3rem',
	cursor: 'pointer',
	variants: {
		color: {
			primary: {
				color: theme.colors.textMedium,
			},
			dark: {
				color: theme.colors.textMedium,
				'&:hover': {
					color: theme.colors.textMediumActive,
					backgroundColor: theme.colors.frosted,
				},
				'&.selected': {
					textDecoration: 'underline dotted',
				},
				'&.selected:hover': {
					textShadow: `0 0 1px ${theme.colors.textMediumActive}`,
				},
			},
		},
	},
	'&.selected': {
		textDecoration: 'underline dotted',
	},
});

type Props = {
	color?: 'primary' | 'dark';
	options: { [index: string]: ReactNode } | string[];
	value: string;
	chooseOption: Dispatch<SetStateAction<any>>;
};

const Dropdown = React.memo(
	({ color = 'primary', options, value, chooseOption, children: label }: PropsWithChildren<Props>) => {
		const [isOpen, setIsOpen] = useState(false);

		const handleInputClick = (e: MouseEvent) => {
			setIsOpen(!isOpen);
			e.stopPropagation();
		};

		const handleDocumentClick = useCallback(() => setIsOpen(false), [setIsOpen]);

		// add eventListener on mount to close dropdown on any click
		useEffect(() => {
			document.addEventListener('click', handleDocumentClick);
			return () => document.removeEventListener('click', handleDocumentClick);
		}, [handleDocumentClick]);

		useEffect(() => {
			setIsOpen(false);
		}, [value, setIsOpen]);

		return (
			<Container>
				{label}
				<Input color={color} className={isOpen ? 'open' : ''} onClick={handleInputClick}>
					{value}
					<BsCaretDownFill />
				</Input>
				<ContainerBelowInput>
					<OptionsContainer color={color} className={isOpen ? 'open' : ''}>
						{Array.isArray(options)
							? options.map((option) => (
									<Option
										key={option}
										color={color}
										className={option === value ? 'selected' : ''}
										onClick={() => chooseOption(option)}
									>
										{option}
									</Option>
							  ))
							: Object.keys(options).map((key) => (
									<Option
										key={key}
										color={color}
										className={key === value ? 'selected' : ''}
										onClick={() => chooseOption(key)}
									>
										{options[key]}
									</Option>
							  ))}
					</OptionsContainer>
				</ContainerBelowInput>
			</Container>
		);
	}
);

Dropdown.displayName = 'OptionsDropdown';

export default Dropdown;
