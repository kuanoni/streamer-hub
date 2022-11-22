import Link from 'next/link';
import React from 'react';
import { styled } from '../../../stiches.config';

const StyledNav = styled('nav', {
	padding: '1rem',
	nav: {
		display: 'flex',
		width: '100%',
		padding: '1rem 2rem',
		backgroundColor: '$bgDark',
		color: '$text',
		borderRadius: 20,
		'& .right': {
			marginLeft: 'auto',
		},
	},
});

const StyledLink = styled(Link, {
	border: 'none',
	backgroundColor: 'transparent',
	textDecoration: 'underline',
	color: 'inherit',
	fontSize: 'inherit',
	cursor: 'pointer',
	'&:not(:last-child)': {
		marginRight: '2rem',
	},
});

const Navbar = () => {
	return (
		<StyledNav>
			<nav>
				<StyledLink href='/'>Home</StyledLink>
				<StyledLink href='/chat'>Chat</StyledLink>
				<StyledLink href='/videos'>Videos</StyledLink>
				<StyledLink href='/admin'>Admin</StyledLink>
			</nav>
		</StyledNav>
	);
};

export default Navbar;
