import { styled, theme } from 'stiches.config';

import DisplayNameInput from '@components/DisplayNameInput';
import { Rank, User } from '@globalTypes/custom-auth';
import { RankColors } from '@modules/chat/common';

import { Info, Label, List } from '../styles';

const TopCutout = styled('div', {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '14rem',
	height: '6rem',
	borderTopLeftRadius: theme.space.borderRad,
	backgroundImage: `radial-gradient(circle at 50% 8.2rem, transparent 6rem, ${theme.colors.primary900} 0)`,
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
	borderTopRightRadius: theme.space.borderRad,
	backgroundColor: theme.colors.primary900,
	fontSize: '2rem',
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
	fontSize: '3rem',
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

const RankDescription: { [index: string]: string } = {
	[Rank.DEFAULT]: 'You have no active subscriptions.',
	[Rank.TIER_1]: 'Tier 1 Subscriber',
	[Rank.TIER_2]: 'Tier 2 Subscriber',
	[Rank.TIER_3]: 'Tier 3 Subscriber',
	[Rank.ORBITER]: 'Orbiter',
	[Rank.OWNER]: 'Owner',
};

interface Props {
	user: User;
}

const ProfileHeader = ({ user }: Props) => {
	const displayNameMissing = user.displayName === '';
	const rank = RankDescription[user.rank];

	return (
		<>
			<TopCutout />
			<Header>
				{displayNameMissing ? (
					<DisplayNameInput user={user} />
				) : (
					<DisplayName rank={user.rank}>{user.displayName}</DisplayName>
				)}
			</Header>
			<SubHeader>
				<Avatar src={user.avatar} alt='profile picture' referrerPolicy='no-referrer' />
				<SubHeaderInfo>
					{displayNameMissing && (
						<>
							<Label>Your username must:</Label>
							<List>
								<li>Be at least 5 characters long</li>
								<li>Be at most 15 characters long</li>
								<li>{'Have no special characters (!?_-.@&$) or spaces'}</li>
								<li>{'Have no bad words'}</li>
							</List>
						</>
					)}
					{!displayNameMissing && (
						<>
							<Label>Joined</Label>
							<Info>6th June, 2021 at 21:47 pm</Info>
							<Label>Subscription</Label>
							<Info>{rank}</Info>
						</>
					)}
				</SubHeaderInfo>
			</SubHeader>
		</>
	);
};

export default ProfileHeader;
