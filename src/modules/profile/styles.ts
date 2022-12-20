import Link from 'next/link';
import { styled, theme } from 'stiches.config';

const colorVariants = {
	color: {
		error: {
			color: '#ff6d6d',
		},
	},
};

const weightVariants = {
	weight: {
		bold: {
			fontWeight: 700,
		},
	},
};

export const Label = styled('div', {
	color: theme.colors.textLight,
	fontWeight: 700,
	marginTop: '1rem',
	variants: { ...colorVariants, ...weightVariants },
});

export const SubLabel = styled('div', {
	color: theme.colors.textDark,
	fontSize: '.8em',
	marginBottom: '.25rem',
	variants: colorVariants,
});

export const StyledLink = styled(Link, {
	color: 'rgb(117, 117, 255)',
	textDecoration: 'underline',
});

export const List = styled('ul', {
	margin: 0,
	padding: 0,
	paddingLeft: '1rem',
	variants: colorVariants,
});

export const Info = styled('div', {});

export const Footer = styled('div', {
	marginTop: '1rem',
});
