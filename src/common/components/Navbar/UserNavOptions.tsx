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

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
});

const Username = styled(Link, {
	padding: '0 .25rem',
	'&:hover': {
		textDecoration: 'underline',
	},
});

const SignedIn = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: 6,
	height: '100%',
	marginRight: '.5rem',
	color: theme.colors.grey400,
	cursor: 'pointer',
	transition: 'color .1s ease',
	'&:hover': {
		color: theme.colors.grey200,
	},
});

const ProfilePic = styled(BsPersonCircle, {
	width: '2.5rem',
	height: '2.5rem',
	marginLeft: '1rem',
	borderRadius: '50%',
});

const ProfilePicImage = styled(Image, {
	width: '2.5rem',
	height: '2.5rem',
	marginLeft: '1rem',
	borderRadius: '50%',
});

const DropdownCaret = styled(BsCaretDownFill, {
	width: '1rem',
	height: '1rem',
	transition: 'transform .2s ease',
	'&.open': {
		transform: 'rotate(180deg)',
	},
});

type Props = {
	user: User | undefined;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn: () => void;
};

const UserNavOptions = ({ user, status, openSignIn }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
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
				<Button color='primary' onClick={openSignIn}>
					Sign In
				</Button>
			)}
			{status === 'loading' && (
				<BeatLoader
					color={theme.colors.grey400.toString()}
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
				<DropdownCaret className={isDropdownOpen ? 'open' : ''} />
			</SignedIn>
			{isDropdownOpen && (
				<UserNavOptionsDropdown setIsDropdownOpen={setIsDropdownOpen} status={status} openSignIn={openSignIn} />
			)}
		</Container>
	);
};

export default UserNavOptions;
