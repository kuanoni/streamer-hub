import { NextComponentType } from 'next';
import { ReactElement, ReactNode } from 'react';
import { DefaultSession } from 'next-auth';

export enum AuthPerms {
	ADMIN,
	MOD,
	USER,
}

export interface PageAuthorizationOptions {
	roleRequired: AuthPerms;
	whileLoading: React.ReactNode;
	unauthorizedRedirect: string;
}

export type Page = NextComponentType & {
	getLayout?: (page: ReactElement) => ReactNode;
	authorizationOptions?: PageAuthorizationOptions | undefined;
};

export type User = DefaultSession['user'] & {
	id: string;
	role: AuthPerms;
	displayName: string;
};

export interface Session {
	user: User;
}
