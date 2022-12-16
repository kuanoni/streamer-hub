import Link from 'next/link';
import { styled, theme } from 'stiches.config';

export const Label = styled('div', {
	fontWeight: 700,
	'&:not(:first-child)': {
		marginTop: '1rem',
	},
});

export const SubLabel = styled('div', {
	color: theme.colors.textDark,
	fontSize: '.8em',
	marginBottom: '.25rem',
});

export const StyledLink = styled(Link, {
	color: 'rgb(117, 117, 255)',
	textDecoration: 'underline',
});

export const List = styled('ul', {
	margin: 0,
	padding: 0,
	paddingLeft: '1rem',
});

export const Info = styled('div', {});

export const Footer = styled('div', {
	marginTop: '1rem',
});
