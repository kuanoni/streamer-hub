import Link from 'next/link';
import React, { useState } from 'react';
import { styled } from '../../../stiches.config';
import SignIn from './SignIn';

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

const NavButtonLinkStyles = {
	border: 'none',
	backgroundColor: 'transparent',
	textDecoration: 'underline',
	color: 'inherit',
	fontSize: 'inherit',
	cursor: 'pointer',
	'&:not(:last-child)': {
		marginRight: '2rem',
	},
	'&:hover': {
		color: '$primary',
	},
	'&:active': {
		color: '$textDark',
	},
};

const StyledLink = styled(Link, NavButtonLinkStyles);
const StyledButton = styled('button', NavButtonLinkStyles);

const Navbar = () => {
	const [isSignInOpen, setIsSignInOpen] = useState(false);

	return (
		<StyledNav>
			<SignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
			<nav>
				<StyledLink href='/'>Home</StyledLink>
				<StyledLink href='/chat'>Chat</StyledLink>
				<StyledLink href='/videos'>Videos</StyledLink>
				<StyledLink href='/admin'>Admin</StyledLink>
				<span className='right'>
					<StyledButton onClick={() => setIsSignInOpen(true)}>Sign In</StyledButton>
				</span>
			</nav>
		</StyledNav>
	);
};

export default Navbar;
