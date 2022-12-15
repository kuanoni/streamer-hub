import { styled, theme } from 'stiches.config';

const Input = styled('input', {
	width: '100%',
	margin: 0,
	fontFamily: 'inherit',

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
				borderTop: `1px solid ${theme.colors.border}`,
				borderLeft: `1px solid ${theme.colors.border}`,
				borderRight: `1px solid ${theme.colors.grey800}`,
				borderBottom: `1px solid ${theme.colors.grey800}`,
				'&:focus': {
					color: theme.colors.textMediumActive,
					outlineColor: theme.colors.grey400,
				},

				'&:disabled': {
					color: theme.colors.textDark,
					backgroundColor: theme.colors.bg,
				},
			},
			transparent: {
				color: theme.colors.textLight,
				backgroundColor: 'transparent',
				border: 'none',
			},
		},
		size: {
			form: {
				marginLeft: '-.4rem',
				padding: '.4rem',
				borderRadius: theme.space.borderRadHalf,
				fontSize: '1rem',
			},
			huge: {
				height: '1em',
				padding: 0,
				fontSize: '2rem',
				fontWeight: 700,
			},
		},
	},
});

interface Props {
	value: string;
	setValue: Function;
	placeholder: string;
	disabled?: boolean;
	color?: 'dark' | 'transparent';
	size?: 'form' | 'huge';
}

const TextInput = ({ value, setValue, placeholder, disabled = false, color = 'dark', size = 'form' }: Props) => {
	const handleChange = (e: React.ChangeEvent) => {
		setValue(e.target.nodeValue);
	};

	return (
		<Input
			type={'text'}
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			disabled={disabled}
			color={color}
			size={size}
		/>
	);
};

export default TextInput;
