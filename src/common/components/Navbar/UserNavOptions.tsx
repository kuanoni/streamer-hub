import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';
import { BsCaretDownFill, BsPersonCircle } from 'react-icons/bs';
import BeatLoader from 'react-spinners/BeatLoader';
import { styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';
import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import UserNavOptionsDropdown from './UserNavOptionsDropdown';

const Username = styled(Link, {
	padding: '0 .25rem',
	'&:hover': {
		textDecoration: 'underline',
	},
});

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: '1rem',
	alignItems: 'center',
	'@sm': { gap: '.5rem' },
	'@xs': {
		[`& ${Username}`]: { display: 'none' },
		'.signin': { display: 'none' },
	},
});

const SignedIn = styled('button', {
	display: 'flex',
	alignItems: 'center',
	gap: 6,
	height: '100%',
	margin: 0,
	marginRight: '.5rem',
	padding: 0,
	color: theme.colors.grey300,
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	transition: 'color .1s ease',
	'&:hover': {
		color: theme.colors.grey100,
	},
});

const ProfilePic = styled(BsPersonCircle, {
	width: '2.5rem',
	height: '2.5rem',
	marginLeft: '1rem',
	borderRadius: '50%',
	'@sm': { marginLeft: '.5rem' },
	'@xs': {
		width: '2rem',
		height: '2rem',
	},
});

const ProfilePicImage = styled(Image, {
	width: '2.5rem',
	height: '2.5rem',
	borderRadius: '50%',
	'@xs': {
		width: '2rem',
		height: '2rem',
	},
});

const DropdownCaret = styled(BsCaretDownFill, {
	width: '1rem',
	height: '1rem',
	transition: 'transform .2s ease',
	'&.open': {
		transform: 'rotate(180deg)',
	},
	'@xs': {
		display: 'none',
		width: '.75rem',
		height: '.75rem',
	},
});

type Props = {
	user: User | undefined;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn: () => void;
};

const UserNavOptions = ({ user, status, openSignIn }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (status === 'loading') return;
		// prevents click event from being passed to newly created event listener in UserDropdownOptions
		e.stopPropagation();
		setIsDropdownOpen((cur) => !cur);
	};

	return (
		<Container>
			{status === 'authenticated' && user && (
				<Username href={'/profile'} css={getUsernameColorsCss(user.role, user.subscriptionTier)}>
					{user.username ? user.username : 'Enter username here'}
				</Username>
			)}
			{status === 'unauthenticated' && (
				<Button className='signin' color='secondary' onClick={openSignIn}>
					Sign In
				</Button>
			)}
			{status === 'loading' && (
				<BeatLoader
					color={theme.colors.grey300.toString()}
					loading={true}
					size='.75rem'
					cssOverride={{ marginRight: '1rem' }}
				/>
			)}
			<SignedIn onClick={handleClick}>
				{status === 'authenticated' && user?.avatar ? (
					<ProfilePicImage
						src={user.avatar}
						alt='avatar'
						width={40}
						height={40}
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
						referrerPolicy='no-referrer'
					/>
				) : (
					<ProfilePic />
				)}
				<DropdownCaret className={isDropdownOpen ? 'open' : ''} aria-hidden='true' />
			</SignedIn>
			{isDropdownOpen && (
				<UserNavOptionsDropdown setIsDropdownOpen={setIsDropdownOpen} status={status} openSignIn={openSignIn} />
			)}
		</Container>
	);
};

export default UserNavOptions;
