import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';
import { BsCaretDownFill, BsPersonCircle } from 'react-icons/bs';
import BeatLoader from 'react-spinners/BeatLoader';
import { styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';
import { User } from '@globalTypes/custom-auth';
import { RankColors } from '@modules/chat/common';

import UserOptionsDropdown from './UserOptionsDropdown';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
});

const DisplayName = styled(Link, {
	variants: {
		rank: RankColors,
	},
	'&:hover': {
		textDecoration: 'underline',
	},
});

const SignedIn = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: 2,
	height: '100%',
	margin: '0 .5rem',
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

interface Props {
	user: User;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn: () => void;
}

const UserSignedIn = ({ user, status, openSignIn }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
		if (status === 'loading') return;
		// prevents click event from being passed to newly created event listener in UserDropdownOptions
		e.stopPropagation();
		setIsDropdownOpen((cur) => !cur);
	};

	return (
		<Container>
			{status === 'authenticated' && (
				<DisplayName href={'/profile'} rank={user.rank}>
					{user.displayName ? user.displayName : 'Enter username here'}
				</DisplayName>
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
				<UserOptionsDropdown setIsDropdownOpen={setIsDropdownOpen} status={status} openSignIn={openSignIn} />
			)}
		</Container>
	);
};

export default UserSignedIn;
