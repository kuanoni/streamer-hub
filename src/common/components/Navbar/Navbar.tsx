import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect, useState } from 'react';
import {
	BsCameraVideoFill, BsCollectionPlayFill, BsFillCartFill, BsFillHouseDoorFill
} from 'react-icons/bs';
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

const Navbar = ({ children }: Props) => {
	const { data, status } = useSession();
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
					<NavButton link='/'>
						<BsFillHouseDoorFill />
						<span className='label'>Home</span>
					</NavButton>
					<NavButton link='/stream'>
						<BsCameraVideoFill />
						<span className='label'>Stream</span>
					</NavButton>
					<NavButton link='/videos'>
						<BsCollectionPlayFill />
						<span className='label'>Videos</span>
					</NavButton>
					<NavButton link='/shop'>
						<BsFillCartFill />
						<span className='label'>Shop</span>
					</NavButton>
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
