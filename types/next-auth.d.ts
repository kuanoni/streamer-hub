import NextAuth from 'next-auth';

import { AuthPerms, Role, SubscriptionTier, UsernameFlair } from './user';

declare module 'next-auth' {
	type User = {
		id: string;
		username: string;
		email: string | null;
		avatar: string;
		joined: Date;

		role: Role;
		subscriptionTier: SubscriptionTier;

		bannedUntil: Date | null;

		authLevel: AuthPerms;
	};

	interface Session {
		user: User;
		expires: ISODateString;
	}
}
