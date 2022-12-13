import Router from 'next/router';
import React, { useState } from 'react';
import { User } from '@types/custom-auth';
import { styled, theme } from 'stiches.config';

interface Props {
	user: User;
}

const Container = styled('div', {
	width: 200,
	padding: '.25rem 0',
});

const StyledLabel = styled('div', {
	display: 'block',
});

const StyledInput = styled('input', {
	display: 'block',
	width: '100%',
	padding: '.35rem',
	color: theme.colors.textLight,
	backgroundColor: theme.colors.primary700,
	border: 'none',
	fontSize: '1rem',
	transition: '.2s ease',
	'&:focus': {
		outline: 'none',
		backgroundColor: theme.colors.primary600,
	},
});

const FocusIndicator = styled('div', {
	display: 'block',
	backgroundColor: theme.colors.trinary600,
	width: '100%',
	height: 2,
	transition: '.1s ease',
	transform: 'scaleX(0%)',
	transformOrigin: 'left',
	'&.show': {
		transform: 'scaleX(100%)',
	},
});

const displayNameRegex = /^[a-zA-Z0-9]+$/;

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const [showFocusIndicator, setShowFocusIndicator] = useState(false);

	const submitDisplayName = async () => {
		if (displayNameValue.length > 15) return console.log('Display name too long');

		// validate display name here
		if (!displayNameRegex.test(displayNameValue))
			return console.log('Display name musr only containe letters or numbers');

		const res = await fetch('/api/db/userSetDisplayName', {
			method: 'PATCH',
			body: JSON.stringify({ _id: user?.id, displayName: displayNameValue }),
		}).then((res) => res.json());

		if (res.status === 200) Router.reload();
	};

	return (
		<Container>
			<StyledLabel>
				<StyledInput
					type='text'
					placeholder='Display Name'
					required
					minLength={5}
					maxLength={15}
					onChange={(e) => setDisplayNameValue(e.target.value)}
					onFocus={() => setShowFocusIndicator(true)}
					onBlur={() => setShowFocusIndicator(false)}
				/>
			</StyledLabel>
			<FocusIndicator className={showFocusIndicator ? 'show' : ''} />
			<button onClick={submitDisplayName}>Set display name</button>
		</Container>
	);
};

export default DisplayNameInput;
