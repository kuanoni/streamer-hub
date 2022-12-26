import { NextComponentType } from 'next';
import { ReactElement, ReactNode } from 'react';

export enum AuthPerms {
	ADMIN,
	MOD,
	USER,
}

export enum Role {
	DEFAULT = 'DEFAULT',
	BUDDY = 'BUDDY',
	OWNER = 'OWNER',
}

export enum SubscriptionTier {
	NONE,
	TIER_1,
	TIER_2,
	TIER_3,
	PERMANENT,
}

export interface PageAuthorizationOptions {
	roleRequired: AuthPerms;
	whileLoading: ReactNode;
	unauthorizedRedirect: string;
}

export type Page = NextComponentType & {
	title?: string;
	getLayout?: (page: ReactElement) => ReactNode;
	authorizationOptions?: PageAuthorizationOptions | undefined;
};
