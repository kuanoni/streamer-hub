import Router from 'next/router';
import React, { useState } from 'react';
import { User } from 'types/custom-auth';
import { styled } from 'stiches.config';

interface Props {
	user: User;
}

const StyledLabel = styled('label', {});
const StyledInput = styled('input', {
	display: 'block',
});

const displayNameRegex = /^[a-zA-Z0-9]+$/;
const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
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
		<>
			<StyledLabel>
				Display Name
				<StyledInput type='text' required onChange={(e) => setDisplayNameValue(e.target.value)} />
			</StyledLabel>
			<button onClick={changeDisplayName}>Set display name</button>
		</>
	);
};

export default DisplayNameInput;
