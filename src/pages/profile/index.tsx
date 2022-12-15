import { useSession } from 'next-auth/react';
import React from 'react';
import { styled, theme } from 'stiches.config';

import DisplayNameInput from '@components/DisplayNameInput';
import AccountSection from '@components/Profile/AccountSection';
import ProfileSection from '@components/Profile/ProfileSection';
import Button from '@components/ui/Button';
import { AuthPerms, Rank, User } from '@globalTypes/custom-auth';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import { RankColors } from '@modules/chat/common';

const Container = styled('div', {
	position: 'relative',
	marginTop: '2rem',
	paddingBottom: '2rem',
	borderRadius: theme.space.borderRad,
	backgroundColor: theme.colors.frosted,
});

const TopCutout = styled('div', {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '14rem',
	height: '6rem',
	borderTopLeftRadius: theme.space.borderRad,
	backgroundImage: `radial-gradient(circle at 50% 8rem, transparent 6rem, ${theme.colors.primary900} 0)`,
});

const Header = styled('header', {
	position: 'absolute',
	top: 0,
	left: '14rem',
	right: 0,

	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'end',
	height: '6rem',
	paddingBottom: '.75rem',
	paddingRight: '3rem',
	borderTopRightRadius: theme.space.borderRad,
	backgroundColor: theme.colors.primary900,
});

const Avatar = styled('img', {
	display: 'block',
	width: '10rem',
	height: '10rem',
	borderRadius: '50%',
	zIndex: 1,
});

const DisplayName = styled('h1', {
	margin: 0,
	lineHeight: '1em',
	variants: { rank: RankColors },
});

const SubHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '2rem',
	padding: '2rem',
	paddingTop: '3rem',
	paddingBottom: '1rem',
});

const SubHeaderInfo = styled('div', {
	paddingTop: '4rem',
});

const Label = styled('div', {
	fontWeight: 700,
});

const Info = styled('div', {
	marginBottom: '.5rem',
});

const ProfileDashboard = () => {
	const { data } = useSession();
	const user: User = data?.user;

	if (!user) return <>Loading...</>; // replace with skeleton

	const rank =
		user.rank === Rank.DEFAULT
			? 'You have no active subscriptions.'
			: user.rank === Rank.TIER_1
			? 'Tier 1 Subscriber'
			: user.rank === Rank.TIER_2
			? 'Tier 2 Subscriber'
			: user.rank === Rank.TIER_3
			? 'Tier 3 Subscriber'
			: user.rank === Rank.ORBITER
			? 'Orbiter'
			: user.rank === Rank.OWNER
			? 'Owner'
			: '';

	const role =
		user.role === AuthPerms.USER
			? 'User'
			: user.role === AuthPerms.MOD
			? 'Mod'
			: user.role === AuthPerms.ADMIN
			? 'Admin'
			: '';

	return (
		<Container>
			<TopCutout />
			<Header>
				{user.displayName ? (
					<DisplayName rank={user.rank}>{user.displayName}</DisplayName>
				) : (
					<DisplayNameInput user={user} />
				)}
				<Button onClick={() => {}}>Edit Profile</Button>
			</Header>

			<SubHeader>
				<Avatar src={user.avatar} alt='profile picture' />
				<SubHeaderInfo>
					<Label>Joined</Label>
					<Info>6th June, 2021 at 21:47 pm</Info>
					<Label>Subscription</Label>
					<Info>{rank}</Info>
				</SubHeaderInfo>
			</SubHeader>
			<AccountSection />
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
