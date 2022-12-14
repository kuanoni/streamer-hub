import Image from 'next/image';
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
	gap: '1rem',
});

const DisplayName = styled('span', {
	variants: {
		rank: RankColors,
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
	[`&:hover ${DisplayName}`]: {
		textDecoration: 'underline',
	},
});

const ProfilePic = styled(BsPersonCircle, {
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
			<SignedIn onClick={handleClick}>
				{status === 'authenticated' && <DisplayName rank={user.rank}>{user.displayName}</DisplayName>}
				{status === 'unauthenticated' && (
					<Button color='primary' onClick={openSignIn}>
						Log In
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
				{status === 'authenticated' && user?.avatar ? (
					<ProfilePic as='img' src={user.avatar} />
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
