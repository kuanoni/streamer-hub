import NextAuth from 'next-auth';

import { UserFlair } from '@modules/chat/common';

import { AuthPerms, Role } from './custom-auth';

declare module 'next-auth' {
	type User = {
		id: string;
		username: string;
		email: string | null;
		avatar: string;
		joined: Date;

		role: Role;
		subscriptionTier: string;
		selectedFlair: UserFlair;
		availableFlairs: UserFlair[];

		bannedUntil: Date | null;

		authLevel: AuthPerms;
	};

	interface Session {
		user: User;
		expires: ISODateString;
	}
}
