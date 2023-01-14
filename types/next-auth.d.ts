import NextAuth from 'next-auth';

declare module 'next-auth' {
	type User = {
		id: string;
		username: string;
		email: string | null;
		avatar: string;
		joined: Date;

		role: import('./user').Role | null;
		infoBadges: import('./user').InfoBadge[];

		subscriptionTier: import('./user').SubscriptionTier;

		bannedUntil: Date | null;

		authLevel: import('./user').AuthPerms;
	};

	interface Session {
		user: User;
		expires: ISODateString;
	}
}
