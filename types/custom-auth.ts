import { NextComponentType } from 'next';
import { ReactElement, ReactNode } from 'react';

export enum Role {
	ADMIN,
	MOD,
	USER,
}

export interface PageAuthorizationOptions {
	roleRequired: Role;
	whileLoading: React.ReactNode;
	unauthorizedRedirect: string;
}

export type Page = NextComponentType & {
	getLayout?: (page: ReactElement) => ReactNode;
	authorizationOptions?: PageAuthorizationOptions | undefined;
};
