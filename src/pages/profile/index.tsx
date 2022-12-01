import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { useSession } from 'next-auth/react';
import React from 'react';
import { styled } from 'stiches.config';
import { AuthPerms } from 'types/custom-auth';
import DisplayNameInput from '@/components/DisplayNameInput';

const Container = styled('div', {
	padding: '1rem 2rem',
	backgroundColor: '$bgDarkest',
	h1: {
		margin: 0,
	},
});

const ProfileDashboard = () => {
	const { data } = useSession();
	const user = data?.user;

	if (!user) return <>Loading...</>;

	return (
		<Container>
			<h1>Profile</h1>
			{user.displayName ? <h2>{user.displayName}</h2> : <DisplayNameInput user={user} />}
		</Container>
	);
};

ProfileDashboard.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

ProfileDashboard.authorizationOptions = {
	roleRequired: AuthPerms.USER,
	whileLoading: <>Loading...</>,
	unauthorizedRedirect: '/',
};

export default ProfileDashboard;
