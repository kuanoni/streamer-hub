import { User } from 'next-auth';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { SubscriptionTier } from '@globalTypes/user';

import { Info, Label } from '../styles';

const Username = styled('h1', {
	display: 'flex',
	alignItems: 'end',
	margin: 0,
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.primary600,
	fontSize: '3rem',
	lineHeight: '1em',
});

const UserInfo = styled('div', {
	padding: '1rem',
});

const SubscriptionTierDescription: { [index: string]: string } = {
	[SubscriptionTier.NONE]: 'You have no active subscriptions.',
	[SubscriptionTier.TIER_1]: 'Tier 1',
	[SubscriptionTier.TIER_2]: 'Tier 2',
	[SubscriptionTier.TIER_3]: 'Tier 3',
};

interface Props {
	user: User;
}

const HeaderInfo = ({ user }: Props) => {
	const subscriptionTier = SubscriptionTierDescription[user.subscriptionTier];
	const joined = new Date(user.joined);

	return (
		<>
			<Username>{user.username}</Username>
			<UserInfo>
				<Label>Joined</Label>
				<Info>{joined.toDateString()}</Info>
				<Label>Subscription</Label>
				<Info>{subscriptionTier}</Info>
			</UserInfo>
		</>
	);
};

export default HeaderInfo;
