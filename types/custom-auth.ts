import { NextComponentType } from 'next';
import { ReactElement, ReactNode } from 'react';

export enum AuthPerms {
	ADMIN,
	MOD,
	USER,
}

export enum Rank {
	DEFAULT = 'DEFAULT',
	TIER_1 = 'TIER_1',
	TIER_2 = 'TIER_2',
	TIER_3 = 'TIER_3',
	ORBITER = 'ORBITER',
	OWNER = 'OWNER',
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
