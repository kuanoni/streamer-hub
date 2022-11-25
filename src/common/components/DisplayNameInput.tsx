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

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');

	const changeDisplayName = async () => {
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
