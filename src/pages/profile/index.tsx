import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { AuthPerms } from '@globalTypes/user';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import ProfileHeaderContainer from '@modules/profile/components/HeaderContainer';
import HeaderInfo from '@modules/profile/components/HeaderInfo';
import AccountSection from '@modules/profile/components/sections/AccountSection';
import SubscriptionSection from '@modules/profile/components/sections/SubscriptionSection';
import UsernameInput from '@modules/profile/components/UsernameInput';

const Container = styled('div', {
	position: 'relative',
	marginTop: '1rem',
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
	overflow: 'hidden',
});

const ProfileDashboard = () => {
	const { data } = useSession();
	const user: User | undefined = data?.user;

	if (!user) return <>Loading...</>; // replace with skeleton

	const usernameMissing = user.username === '';

	return (
		<Container>
			<ProfileHeaderContainer user={user}>
				{usernameMissing ? <UsernameInput user={user} /> : <HeaderInfo user={user} />}
			</ProfileHeaderContainer>
			<AccountSection user={user} locked={usernameMissing} />
			<SubscriptionSection locked={usernameMissing} />
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
