import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stiches.config';

const NavLink = styled(Link, {
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'end',
	padding: '16px 32px',
	color: '$textDarker',
	borderBottom: '1px solid $textDarker',
	fontFamily: 'DM Sans',
	fontSize: '1rem',
	fontWeight: 500,
	verticalAlign: 'bottom',
	transform: 'translateY(1px)',
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

const NavButton = ({ link, children }: { link: string; children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<NavLink href={link} className={router.asPath.split('#')[0] === link ? 'current' : ''}>
			{children}
		</NavLink>
	);
};

export default NavButton;
