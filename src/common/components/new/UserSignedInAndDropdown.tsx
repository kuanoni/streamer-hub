import React, { useRef, useState } from 'react';
import { BsCaretDownFill, BsPersonCircle } from 'react-icons/bs';
import { styled } from 'stiches.config';
import UserOptionsDropdown from './UserOptionsDropdown';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: '1rem',
});

const SignInButton = styled('button', {
	padding: '0 2rem',
	color: '$text',
	backgroundColor: '$primary',
	border: 'none',
	borderRadius: 5,
	fontSize: '1rem',
	cursor: 'pointer',
	transition: '.1s ease',
	'&:hover': {
		backgroundColor: '$primaryLight',
	},
});

const SignedIn = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: 2,
	height: '100%',
	margin: '0 .5rem',
	color: '$textDarker',
	cursor: 'pointer',
	transition: 'color .1s ease',
	'&:hover': {
		color: '$text',
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
	status: 'authenticated' | 'loading' | 'unauthenticated';
}

const UserSignedInAndDropdown = ({ status }: Props) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const signedInRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (isDropdownOpen) document.addEventListener('click', handleOutsideClick);
		else document.removeEventListener('click', handleOutsideClick);

		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (!signedInRef.current?.contains(e.target as Node)) handleClick();
	};

	return (
		<Container>
			{status === 'unauthenticated' && <SignInButton>Sign In</SignInButton>}
			<SignedIn ref={signedInRef} onClick={handleClick}>
				<BsPersonCircle className='profile-pic' />
				<BsCaretDownFill className={'dropdown-caret' + (isDropdownOpen ? ' open' : '')} />
			</SignedIn>
			{isDropdownOpen && <UserOptionsDropdown ref={dropdownRef} />}
		</Container>
	);
};

export default UserSignedInAndDropdown;
