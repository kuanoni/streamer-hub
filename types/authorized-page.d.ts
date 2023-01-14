import type { NextComponentType } from 'next';
import type { AuthPerms } from './user';
import type { ReactNode } from 'react';

interface PageAuthorizationOptions {
	roleRequired: AuthPerms;
	whileLoading: ReactNode;
	unauthorizedRedirect: string;
}

type Page = NextComponentType & {
	title?: string;
	getLayout?: (page: ReactElement) => ReactNode;
	authorizationOptions?: PageAuthorizationOptions | undefined;
};
