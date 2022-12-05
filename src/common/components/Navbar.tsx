import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { styled } from 'stiches.config';
import SignIn from './SignIn';
import { AuthPerms } from 'types/custom-auth';
import { useRouter } from 'next/router';
import NavButton from './new/NavButton';
import UserSignedIn from './new/UserSignedIn';

const StyledNav = styled('nav', {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	color: '$text',
	borderBottom: '1px solid $textDarker',
});

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
				{data?.user?.role === AuthPerms.ADMIN && <NavButton link='/admin'>Admin</NavButton>}
				{status === 'authenticated' ? (
					<UserSignedIn status={status} />
				) : (
					<UserSignedIn status={status} openSignIn={openSignIn} />
				)}
			</StyledNav>
		</>
	);
};

export default Navbar;
