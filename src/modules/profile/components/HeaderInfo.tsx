import { User } from 'next-auth';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { Rank } from '@globalTypes/custom-auth';
import { RankColors } from '@modules/chat/common';

import { Info, Label } from '../styles';

const DisplayName = styled('h1', {
	display: 'flex',
	alignItems: 'end',
	margin: 0,
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.primary900,
	fontSize: '3rem',
	lineHeight: '1em',
	variants: { rank: RankColors },
});

const UserInfo = styled('div', {
	padding: '1rem',
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

const HeaderInfo = ({ user }: Props) => {
	const rank = RankDescription[user.rank];
	const joined = new Date(user.joined);

	return (
		<>
			<DisplayName rank={user.rank}>{user.username}</DisplayName>
			<UserInfo>
				<Label>Joined</Label>
				<Info>{joined.toDateString()}</Info>
				<Label>Subscription</Label>
				<Info>{rank}</Info>
			</UserInfo>
		</>
	);
};

export default HeaderInfo;
