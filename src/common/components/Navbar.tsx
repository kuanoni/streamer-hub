import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { styled } from 'stiches.config';
import SignIn from './SignIn';
import { Role } from 'types/custom-auth';

const StyledNav = styled('nav', {
	padding: '1rem 2rem',
	nav: {
		display: 'flex',
		width: '100%',
		padding: '1rem',
		backgroundColor: '$bgDarkest',
		color: '$text',
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
	const { data, status } = useSession();
	const [isSignInOpen, setIsSignInOpen] = useState(false);

	return (
		<StyledNav>
			<SignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
			<nav>
				<StyledLink href='/'>Home</StyledLink>
				<StyledLink href='/stream'>Stream</StyledLink>
				<StyledLink href='/videos'>Videos</StyledLink>
				<StyledLink href='/admin'>Admin</StyledLink>
				<span className='right'>
					{status === 'authenticated' ? (
						<>
							<StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
							<StyledLink href='/profile'>Profile</StyledLink>
						</>
					) : (
						<StyledButton onClick={() => setIsSignInOpen(true)}>Sign In</StyledButton>
					)}
				</span>
			</nav>
		</StyledNav>
	);
};

export default Navbar;
