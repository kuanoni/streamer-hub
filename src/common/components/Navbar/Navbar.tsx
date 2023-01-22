import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BsCameraVideoFill, BsFillCartFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { HiOutlineMenu } from 'react-icons/hi';
import { keyframes, styled, theme } from 'stiches.config';

import IconButton from '@components/ui/IconButton';
import { AuthPerms } from '@globalTypes/user';
import fetchLivestreamData from '@modules/youtube/utils/fetchLivestreamData';
import { useQuery } from '@tanstack/react-query';

import SignInModal from '../SignInModal';
import BrandLogo from './BrandLogo';
import NavButton from './NavButton';
import UserNavOptions from './UserNavOptions';

const controlBarHeight = '52px';

const NavButtonsOpen = keyframes({
	'0%': {
		position: 'static',
		visibility: 'visible',
		opacity: 0,
	},
	'100%': {
		position: 'static',
		visibility: 'visible',
		opacity: 1,
	},
});

const NavButtonClose = keyframes({
	'0%': {
		position: 'static',
		visibility: 'visible',
		opacity: 1,
	},
	'99%': { opacity: 0, position: 'static' },
	'100%': {
		visibility: 'hidden',
		position: 'absolute',
		opacity: 0,
	},
});

const NavOpen = keyframes({
	'0%': { transform: `translateY(calc(-100% + ${controlBarHeight}))` },
	'100%': { transform: 'translateY(0%)' },
});

const NavClose = keyframes({
	'0%': { transform: 'translateY(0%)' },
	'100%': { transform: `translateY(calc(-100% + ${controlBarHeight}))` },
});

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	width: '100%',
	margin: '0 auto',
	zIndex: 1,
	'@sm': { flexDirection: 'column' },
});

const NavButtons = styled('div', {
	display: 'flex',
	width: '100%',
	'@sm': {
		display: 'block',
		visibility: 'collapse',
		'&.noanim': { animationDuration: '0s !important' },
		'&.open': { animation: `${NavButtonsOpen} .2s forwards` },
		'&.closed': { animation: `${NavButtonClose} .2s forwards` },
	},
});

const ControlBar = styled('div', {
	display: 'flex',
	alignItems: 'center',
	marginLeft: 'auto',
	[`& ${IconButton}`]: { display: 'none' },
	'@sm': {
		width: '100%',
		height: controlBarHeight,
		padding: '.5rem',
		backgroundColor: theme.colors.primary400,
		[`& ${IconButton}`]: { display: 'initial' },
		[`&.open ${IconButton} > svg`]: { transform: 'rotate(180deg) translate(50%, 50%)' },
		[`& ${IconButton} > svg`]: {
			transformOrigin: 'center',
			transition: 'transform .2s ease',
		},
	},
});

const TextLogo = styled('h2', {
	margin: 0,
	marginLeft: '.5rem',
	display: 'none',
	'@sm': { display: 'flex', alignItems: 'center', gap: '.25rem' },
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
		'&.noanim': { animationDuration: '0s !important' },
		'&.open': { animation: `${NavOpen} .2s forwards` },
		'&.closed': { animation: `${NavClose} .2s forwards` },
	},
});

const LiveBadge = styled('span', {
	display: 'inline',
	padding: '2px 4px',
	marginLeft: 6,
	color: theme.colors.textLightActive,
	backgroundColor: '#e30000',
	borderRadius: theme.space.borderRad,
	fontSize: '.9em',
});

const Navbar = () => {
	const { data, status } = useSession();
	const [isSignInOpen, setIsSignInOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [canPlayAnimation, setCanPlayAnimation] = useState(false);

	const { data: livestreamData } = useQuery<LivestreamData>(['checkLivestreamStatus'], fetchLivestreamData, {
		staleTime: 1000 * 60 * 2,
	});

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
				<Nav className={animationClasses}>
					<NavButtons className={animationClasses}>
						<NavButton link='/'>
							<BsFillHouseDoorFill />
							<span className='label'>Home</span>
						</NavButton>
						<NavButton link='/shop'>
							<BsFillCartFill />
							<span className='label'>Shop</span>
						</NavButton>
						<NavButton link='/stream'>
							<BsCameraVideoFill />
							<span className='label'>
								Stream
								{livestreamData?.live && <LiveBadge>LIVE</LiveBadge>}
							</span>
						</NavButton>
						{data?.user?.authLevel === AuthPerms.ADMIN && <NavButton link='/admin'>Admin</NavButton>}
					</NavButtons>
					<ControlBar>
						<IconButton color='lightTransparent' size='2.25rem' iconSizeRatio={0.75} onClick={toggleNavbar}>
							<HiOutlineMenu />
						</IconButton>
						<TextLogo>KroyOoz.tv {livestreamData?.live && <LiveBadge>LIVE</LiveBadge>}</TextLogo>
						<UserNavOptions user={data?.user} status={status} openSignIn={() => setIsSignInOpen(true)} />
					</ControlBar>
				</Nav>
			</Container>
		</>
	);
};

export default Navbar;
