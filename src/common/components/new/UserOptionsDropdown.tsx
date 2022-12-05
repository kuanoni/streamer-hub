import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsBoxArrowLeft, BsBoxArrowRight, BsPersonFill, BsQuestionCircleFill } from 'react-icons/bs';
import { keyframes, styled } from 'stiches.config';

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

	backgroundColor: '$action',
	borderRadius: 10,
	zIndex: 1,
	transform: 'translateY(100%)',
	animation: `${moveIn} .25s`,
});

const LinkButton = styled(Link, {
	display: 'flex',
	alignItems: 'center',
	gap: '.5rem',
	height: '2rem',
	padding: '0 .5rem',
	color: '$textDark',
	backgroundColor: 'transparent',
	border: 'none',
	fontSize: '.875rem',
	cursor: 'pointer',
	'&:hover': {
		color: '$text',
		backgroundColor: '$primary',
	},
	svg: {
		height: '50%',
	},
});

const Separator = styled('div', {
	height: 1,
	margin: '.5rem',
	borderBottom: '1px solid $textDarker',
});

interface Props {
	setIsDropdownOpen: (setState: React.SetStateAction<boolean>) => void;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn?: () => void;
}

const UserOptionsDropdown = ({ status, setIsDropdownOpen, openSignIn }: Props) => {
	const handleClick = () => setIsDropdownOpen((cur) => !cur);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

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
					<LinkButton href='/profile' onClick={openSignIn}>
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

export default UserOptionsDropdown;
