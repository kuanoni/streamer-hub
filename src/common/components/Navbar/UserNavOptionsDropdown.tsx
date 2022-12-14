import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import {
	BsBoxArrowLeft, BsBoxArrowRight, BsPersonFill, BsQuestionCircleFill
} from 'react-icons/bs';
import { keyframes, styled, theme } from 'stiches.config';

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(-10px) translateY(100%)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px) translateY(100%)',
	},
});

const Options = styled('div', {
	position: 'absolute',
	bottom: -10,
	right: '.5rem',
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	minWidth: '10rem',
	padding: '.5rem 0',
	boxShadow: '#242424 0px 3px 5px 1px',

	backgroundColor: theme.colors.grey800,
	borderRadius: theme.space.borderRad,
	zIndex: 2,
	transform: 'translateY(100%)',
	animation: `${moveIn} .25s`,
});

const LinkButton = styled(Link, {
	display: 'flex',
	alignItems: 'center',
	gap: '.5rem',
	height: '2rem',
	padding: '0 .5rem',
	color: theme.colors.textMedium,
	backgroundColor: 'transparent',
	border: 'none',
	fontSize: '.875rem',
	cursor: 'pointer',
	'&:hover': {
		color: theme.colors.textMediumActive,
		backgroundColor: theme.colors.frosted,
	},
	'&:active': {
		color: theme.colors.textMediumActive,
		backgroundColor: theme.colors.primary900,
		transitionDuration: '0s',
	},
	svg: {
		height: '50%',
	},
});

const Separator = styled('div', {
	height: 1,
	margin: '.5rem',
	borderBottom: `1px solid ${theme.colors.grey500}`,
});

type Props = {
	setIsDropdownOpen: (setState: React.SetStateAction<boolean>) => void;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn?: () => void;
};

const UserNavOptionsDropdown = ({ status, setIsDropdownOpen, openSignIn }: Props) => {
	const handleClick = useCallback(() => setIsDropdownOpen((cur) => !cur), [setIsDropdownOpen]);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [handleClick]);

	const handleClickWithoutClosing: React.MouseEventHandler = (e) => {
		e.stopPropagation();
	};

	return (
		<Options onClick={handleClickWithoutClosing}>
			<LinkButton href='/support'>
				<BsQuestionCircleFill />
				Support
			</LinkButton>
			<Separator />

			{status === 'unauthenticated' ? (
				<LinkButton as={'button'} onClick={openSignIn}>
					<BsBoxArrowLeft />
					Sign In
				</LinkButton>
			) : (
				<>
					<LinkButton href='/profile'>
						<BsPersonFill />
						Profile
					</LinkButton>
					<LinkButton as={'button'} onClick={() => signOut()}>
						<BsBoxArrowRight />
						Sign Out
					</LinkButton>
				</>
			)}
		</Options>
	);
};

export default UserNavOptionsDropdown;
