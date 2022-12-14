import React, { MouseEventHandler, useRef, useState } from 'react';
import { BsCaretDownFill, BsPersonCircle } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';
import { RankColors } from '@modules/chat/common';

import UserOptionsDropdown from './UserOptionsDropdown';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: '1rem',
	marginLeft: 'auto',
});

const Username = styled('span', {
	marginRight: '1rem',
	variants: {
		rank: RankColors,
	},
});

const SignInButton = styled('button', {
	padding: '0 2rem',
	color: theme.colors.textLight,
	backgroundColor: theme.colors.primary400,
	border: 'none',
	borderRadius: theme.space.borderRadHalf,
	fontSize: '1rem',
	cursor: 'pointer',
	transition: '.1s ease',
	'&:hover': {
		backgroundColor: theme.colors.primary300,
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
	[`&:hover ${Username}`]: {
		textDecoration: 'underline',
	},
	'.profile-pic': {
		width: '2rem',
		height: '2rem',
	},
	'.dropdown-caret': {
		width: '1rem',
		height: '1rem',
		transition: 'transform .2s ease',
	},
	'.dropdown-caret.open': {
		transform: 'rotate(180deg)',
	},
});

interface Props {
	user: User;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	openSignIn?: () => void;
}

const UserSignedIn = ({ user, status, openSignIn }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
		// prevents click event from being passed to newly created event listener in UserDropdownOptions
		e.stopPropagation();
		setIsDropdownOpen((cur) => !cur);
	};

	return (
		<Container>
			{status === 'unauthenticated' && <SignInButton onClick={openSignIn}>Sign In</SignInButton>}
			<SignedIn onClick={handleClick}>
				{status === 'authenticated' && <Username rank={user.rank}>{user.displayName}</Username>}
				<BsPersonCircle className='profile-pic' />
				<BsCaretDownFill className={'dropdown-caret' + (isDropdownOpen ? ' open' : '')} />
			</SignedIn>
			{isDropdownOpen && (
				<UserOptionsDropdown setIsDropdownOpen={setIsDropdownOpen} status={status} openSignIn={openSignIn} />
			)}
		</Container>
	);
};

export default UserSignedIn;
