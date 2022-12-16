import Router from 'next/router';
import React, { useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';

import Button from './ui/Button';
import TextInput from './ui/TextInput';

interface Props {
	user: User;
}

const Container = styled('div', {
	position: 'relative',
	width: '65%',
	borderBottom: `1px solid ${theme.colors.grey400}`,
});

const ButtonContainer = styled('div', {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	height: '100%',
	padding: '.25rem',
	aspectRatio: 1,
});

const displayNameRegex = /^[a-zA-Z0-9]+$/;

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');

	const submitDisplayName = async () => {
		if (displayNameValue.length < 5) return console.log('Display name too short');
		if (displayNameValue.length > 15) return console.log('Display name too long');

		// validate display name here
		if (!displayNameRegex.test(displayNameValue))
			return console.log('Display name must only contain letters or numbers');

		const res = await fetch('/api/db/userSetDisplayName', {
			method: 'PATCH',
			body: JSON.stringify({ _id: user?.id, displayName: displayNameValue }),
		}).then((res) => res.json());

		if (res.status === 200) Router.reload();
		// handle response errors here
	};

	return (
		<Container>
			<TextInput
				value={displayNameValue}
				setValue={setDisplayNameValue}
				placeholder={'Enter username...'}
				autoFocus
				maxLength={15}
				color='transparent'
				size='huge'
			/>
			<ButtonContainer>
				<Button content='icon' size='fill' onClick={submitDisplayName}>
					<BsFillHandThumbsUpFill />
				</Button>
			</ButtonContainer>
		</Container>
	);
};

export default DisplayNameInput;
