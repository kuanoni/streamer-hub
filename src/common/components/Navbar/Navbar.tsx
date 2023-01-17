import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
	BsCameraVideoFill, BsCaretDownFill, BsCollectionPlayFill, BsFillCartFill, BsFillHouseDoorFill
} from 'react-icons/bs';
import { keyframes, styled, theme } from 'stiches.config';

import IconButton from '@components/ui/IconButton';
import { AuthPerms } from '@globalTypes/user';

import SignInModal from '../SignInModal';
import BrandLogo from './BrandLogo';
import NavButton from './NavButton';
import UserNavOptions from './UserNavOptions';

const NavButtonsOpen = keyframes({
	'0%': { visibility: 'visible' },
	'1%': {
		opacity: 0,
		transform: 'translateY(-50px)',
	},
	'100%': {
		visibility: 'visible',
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

const NavButtonClose = keyframes({
	'0%': {
		visibility: 'visible',
		opacity: 1,
		transform: 'translateY(0px)',
	},
	'99%': {
		opacity: 0,
		transform: 'translateY(-50px)',
	},
	'100%': { visibility: 'collapse' },
});

const ControlButtonsOpen = keyframes({
	'0%': { transform: 'translateY(-50px)' },
	'100%': { transform: 'translateY(0px)' },
});

const ControlButtonsClose = keyframes({
	'0%': { transform: 'translateY(0px)' },
	'100%': { transform: 'translateY(-50px)' },
});

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	width: '100%',
	margin: '0 auto',
	'@sm': { flexDirection: 'column' },
});

const NavButtons = styled('div', {
	display: 'flex',
	width: '100%',
	'@sm': {
		display: 'block',
		visibility: 'collapse',
		border: `1px solid ${theme.colors.grey700}`,
		'&.noanim': { animationDuration: '0s !important' },
		'&.open': { animation: `${NavButtonsOpen} .2s forwards` },
		'&.closed': { animation: `${NavButtonClose} .2s` },
	},
});

const ControlButtons = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginLeft: 'auto',
	[`& ${IconButton}`]: { display: 'none' },
	'@sm': {
		width: '100%',
		padding: '.5rem',
		'&.noanim': { animationDuration: '0s !important' },
		'&.open': { animation: `${ControlButtonsOpen} .2s` },
		'&.closed': { animation: `${ControlButtonsClose} .2s` },
		[`& ${IconButton}`]: { display: 'initial' },
		[`&.open ${IconButton} > svg`]: { transform: 'rotate(180deg) translate(50%, 50%)' },
		[`& ${IconButton} > svg`]: {
			transformOrigin: 'center',
			transition: 'transform .2s ease',
		},
	},
});

const Nav = styled('nav', {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	marginTop: 'auto',
	borderBottom: `1px solid ${theme.colors.grey700}`,
	'@sm': {
		flexDirection: 'column',
		alignItems: 'start',
		margin: 0,
	},
});

const Navbar = () => {
	const { data, status } = useSession();
	const [isSignInOpen, setIsSignInOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [canPlayAnimation, setCanPlayAnimation] = useState(false);

	useEffect(() => {
		if (window.location.hash.startsWith('#signin') && status !== 'authenticated') setIsSignInOpen(true);
		else setIsSignInOpen(false);
	}, [setIsSignInOpen, status]);

	const toggleNavbar = () => {
		// don't play animations until the toggle button has been clicked once
		setCanPlayAnimation(true);
		setIsOpen((cur) => !cur);
	};

	const animationClasses = `${isOpen ? 'open' : 'closed'} ${canPlayAnimation ? '' : 'noanim'}`;

	return (
		<>
			<SignInModal isOpen={isSignInOpen} close={() => setIsSignInOpen(false)} />
			<Container>
				<BrandLogo />
				<Nav>
					<NavButtons className={animationClasses}>
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
					</NavButtons>
					<ControlButtons className={animationClasses}>
						<IconButton color='primary' size='2rem' onClick={toggleNavbar}>
							<BsCaretDownFill />
						</IconButton>
						<UserNavOptions user={data?.user} status={status} openSignIn={() => setIsSignInOpen(true)} />
					</ControlButtons>
				</Nav>
			</Container>
		</>
	);
};

export default Navbar;
