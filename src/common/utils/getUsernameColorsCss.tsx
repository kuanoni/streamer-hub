import { theme } from 'stiches.config';

import { Role, SubscriptionTier } from '@globalTypes/user';

const subscriberColors = {
	[SubscriptionTier.NONE]: {
		color: theme.colors.textLight,
	},
	[SubscriptionTier.TIER_1]: {
		color: 'rgb(232, 219, 164)',
	},
	[SubscriptionTier.TIER_2]: {
		color: 'rgb(231, 214, 36)',
	},
	[SubscriptionTier.TIER_3]: {
		color: 'rgb(17, 225, 224)',
	},
	[SubscriptionTier.PERMANENT]: {
		color: 'rgb(48, 19, 255)',
	},
};

const roleColors = {
	[Role.BUDDY]: {
		color: theme.colors.textPrimaryMedium,
		backgroundColor: theme.colors.frostedPrimary,
	},
	[Role.OWNER]: {
		color: 'rgb(225, 53, 53)',
		backgroundColor: '#ff000826',
	},
};

const getUsernameColorsCss = (role?: Role | null, subTier?: SubscriptionTier) => {
	return role ? roleColors[role] : subTier !== undefined ? subscriberColors[subTier] : {};
};

export default getUsernameColorsCss;
