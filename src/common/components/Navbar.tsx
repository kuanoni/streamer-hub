import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';
import { styled, theme } from 'stiches.config';
import SignIn from './SignIn';
import { AuthPerms } from 'types/custom-auth';
import { useRouter } from 'next/router';
import NavButton from './new/NavButton';
import UserSignedIn from './new/UserSignedIn';
import BrandLogo from './BrandLogo';

const Topbar = styled('div', {
	position: 'relative',
	display: 'flex',
});

const Nav = styled('nav', {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	marginTop: 'auto',
	borderBottom: `1px solid ${theme.colors.grey900}`,
});

const AlignRightContainer = styled('div', {
	display: 'flex',
	gap: '2rem',
	marginLeft: 'auto',
});

const Navbar: FC<{ children?: React.ReactNode }> = ({ children }) => {
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
	}, [router.asPath, setIsSignInOpen, status]);

	return (
		<>
			<SignIn isOpen={isSignInOpen} close={closeSignIn} />
			<Topbar>
				<BrandLogo />
				<Nav>
					<NavButton link='/'>Home</NavButton>
					<NavButton link='/stream'>Stream</NavButton>
					<NavButton link='/videos'>Videos</NavButton>
					{data?.user?.role === AuthPerms.ADMIN && <NavButton link='/admin'>Admin</NavButton>}
					<AlignRightContainer>
						{children}
						<UserSignedIn user={data?.user} status={status} openSignIn={openSignIn} />
					</AlignRightContainer>
				</Nav>
			</Topbar>
		</>
	);
};

export default Navbar;
