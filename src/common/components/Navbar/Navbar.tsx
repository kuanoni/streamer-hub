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
	maxWidth: theme.space.pageWidth,
	margin: '0 auto',
	'&.full-width': {
		maxWidth: 'none',
	},
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

interface Props {
	fullWidth?: boolean;
	children?: ReactNode;
}

const Navbar = ({ fullWidth = false, children }: Props) => {
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
			<Topbar className={fullWidth ? 'full-width' : ''}>
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
