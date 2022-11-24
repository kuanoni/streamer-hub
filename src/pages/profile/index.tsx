import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { styled } from '../../../stiches.config';
import { Role } from 'types/custom-auth';

const Container = styled('div', {
	padding: '1rem 2rem',
	backgroundColor: '$bgDark',
	h1: {
		margin: 0,
	},
});

const StyledLabel = styled('label', {});
const StyledInput = styled('input', {
	display: 'block',
});

const ProfileDashboard = () => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const { data } = useSession();
	const user = data?.user;

	const changeDisplayName = async () => {
		const res = await fetch('/api/db/userSetDisplayName', {
			method: 'PATCH',
			body: JSON.stringify({ _id: user?.id, displayName: displayNameValue }),
		}).then((res) => res.json());

		console.log(res);
	};

	if (!user) return <>Loading...</>;

	return (
		<Container>
			<h1>Profile</h1>
			{user.displayName ? (
				<h2>{user.displayName}</h2>
			) : (
				<>
					<StyledLabel>
						Display Name
						<StyledInput type='text' required onChange={(e) => setDisplayNameValue(e.target.value)} />
					</StyledLabel>
					<button onClick={changeDisplayName}>Set display name</button>
				</>
			)}
		</Container>
	);
};

export default ProfileDashboard;

ProfileDashboard.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

ProfileDashboard.authorizationOptions = {
	roleRequired: Role.USER,
	whileLoading: <>Loading...</>,
	unauthorizedRedirect: '/',
};
