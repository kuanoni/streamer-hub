import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { styled, theme } from 'stiches.config';

import { AuthPerms } from '@globalTypes/user';

import SignIn from '../SignInModal';
import BrandLogo from './BrandLogo';
import NavButton from './NavButton';
import UserNavOptions from './UserNavOptions';

const Topbar = styled('div', {
	position: 'relative',
	display: 'flex',
	width: '100%',
	margin: '0 auto',
});

const Nav = styled('nav', {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	marginTop: 'auto',
	borderBottom: `1px solid ${theme.colors.grey700}`,
});

const AlignRightContainer = styled('div', {
	display: 'flex',
	gap: '2rem',
	marginLeft: 'auto',
});

interface Props {
	children?: ReactNode;
}

	const { data, status } = useSession();
const Navbar = ({ children }: Props) => {
	const [isSignInOpen, setIsSignInOpen] = useState(false);

	const openSignIn = () => {
		setIsSignInOpen(true);
	};

	const closeSignIn = () => {
		setIsSignInOpen(false);
	};

	useEffect(() => {
		if (window.location.hash.startsWith('#signin') && status !== 'authenticated') setIsSignInOpen(true);
		else setIsSignInOpen(false);
	}, [setIsSignInOpen, status]);

	return (
		<>
			<SignIn isOpen={isSignInOpen} close={closeSignIn} />
			<Topbar>
				<BrandLogo />
				<Nav>
					<NavButton link='/'>Home</NavButton>
					<NavButton link='/stream'>Stream</NavButton>
					<NavButton link='/videos'>Videos</NavButton>
					{data?.user?.authLevel === AuthPerms.ADMIN && <NavButton link='/admin'>Admin</NavButton>}
					<AlignRightContainer>
						{children}
						<UserNavOptions user={data?.user} status={status} openSignIn={openSignIn} />
					</AlignRightContainer>
				</Nav>
			</Topbar>
		</>
	);
};

export default Navbar;
