import Link from 'next/link';
import React from 'react';
import { styled } from 'stiches.config';

const NavLink = styled(Link, {
	position: 'relative',
	padding: '16px 32px',
	color: '$textDarker',
	borderBottom: '1px solid $textDarker',
	fontFamily: 'DM Sans',
	fontSize: '1.25rem',
	fontWeight: 500,
	transition: 'color border-color background .2s ease',
	'&::after': {
		content: '',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: '0%',
		background: 'linear-gradient(180deg, rgba(63, 88, 148, 0) 0%, rgba(63, 88, 148, 0.2) 100%)',
		transition: 'height .1s ease-in',
	},
	'&:hover': {
		borderColor: '$primary',
	},
	'&:hover::after': {
		height: '100%',
	},
	'&:active': {
		color: '$primaryLight',
	},
	'&:active::after': {
		background: 'linear-gradient(180deg, rgba(63, 88, 148, 0) 0%, rgba(63, 88, 148, 0.2) 50%)',
	},
	'&.current': {
		color: '$primary',
	},
	'&.current::after': {
		height: '100%',
		background: 'linear-gradient(180deg, rgba(63, 88, 148, 0) 0%, rgba(63, 88, 148, 0.2) 50%)',
	},
});

const NavButton = ({ text, link, isActive }: { text: string; link: string; isActive?: boolean }) => {
	return (
		<NavLink href={link} className={isActive ? 'current' : ''}>
			{text}
		</NavLink>
	);
};

export default NavButton;
