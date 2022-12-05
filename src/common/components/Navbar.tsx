import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { styled } from 'stiches.config';
import SignIn from './SignIn';
import { AuthPerms } from 'types/custom-auth';
import { useRouter } from 'next/router';
import NavButton from './new/NavButton';

const StyledNav = styled('nav', {
	display: 'flex',
	width: '100%',
	height: 72,
	color: '$text',
	borderBottom: '1px solid $textDarker',
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
	const router = useRouter();

	const openSignIn = () => {
		if (!window.location.hash) router.push({ hash: 'signin' });
	};

	const closeSignIn = () => {
		router.push({ hash: '' });
	};

	useEffect(() => {
		if (window.location.hash.startsWith('#signin') && status !== 'authenticated') setIsSignInOpen(true);
		else setIsSignInOpen(false);
	}, [router.asPath, setIsSignInOpen]);

	return (
		<>
			<SignIn isOpen={isSignInOpen} close={closeSignIn} />
			<StyledNav>
				<NavButton link='/'>Home</NavButton>
				<NavButton link='/stream'>Stream</NavButton>
				<NavButton link='/videos'>Videos</NavButton>
				{data?.user?.role === AuthPerms.ADMIN && <StyledLink href='/admin'>Admin</StyledLink>}
				<span className='right'>
					{status === 'authenticated' ? (
						<>
							<StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
							<StyledLink href='/profile'>Profile</StyledLink>
						</>
					) : (
						<StyledButton onClick={openSignIn}>Sign In</StyledButton>
					)}
				</span>
			</StyledNav>
		</>
	);
};

export default Navbar;
