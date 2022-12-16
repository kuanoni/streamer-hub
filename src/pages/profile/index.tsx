import { useSession } from 'next-auth/react';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { AuthPerms, Rank, User } from '@globalTypes/custom-auth';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import ProfileHeader from '@modules/profile/components/Header';
import AccountSection from '@modules/profile/components/sections/AccountSection';
import SubscriptionSection from '@modules/profile/components/sections/SubscriptionSection';

const Container = styled('div', {
	position: 'relative',
	marginTop: '2rem',
	paddingBottom: '2rem',
	borderRadius: theme.space.borderRad,
	background: `
    radial-gradient(
            20.01% 20.78% at 80.58% 81.62%, 
            rgba(8, 255, 0, 0.04) 21.39%,
            rgba(33, 17, 38, 0) 100%
        ), 
        radial-gradient(
            35.36% 170.61% at 22.03% 20.19%, 
            rgba(151, 0, 255, 0.08) 16.22%, 
            rgba(45, 50, 72, 0) 100%
        ), 
        rgba(255, 255, 255, 0.03)`,
});

const ProfileDashboard = () => {
	const { data } = useSession();
	const user: User = data?.user;

	if (!user) return <>Loading...</>; // replace with skeleton

	const displayNameMissing = user.displayName === '';

	return (
		<Container>
			<ProfileHeader user={user} />
			<AccountSection user={user} locked={displayNameMissing} />
			<SubscriptionSection locked={displayNameMissing} />
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

ProfileDashboard.title = 'Profile';

export default ProfileDashboard;
