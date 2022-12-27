export enum AuthPerms {
	ADMIN,
	MOD,
	USER,
}

export enum SubscriptionTier {
	NONE,
	TIER_1,
	TIER_2,
	TIER_3,
	PERMANENT,
}

export enum Role {
	DEFAULT = 'DEFAULT',
	BUDDY = 'BUDDY',
	OWNER = 'OWNER',
}

export enum UsernameFlair {
	DEFAULT = '',
	TIER_1_SUB = 't1',
	TIER_2_SUB = 't2',
	TIER_3_SUB = 't3',
	BUDDY = 'buddy',
	OWNER = 'owner',
}
