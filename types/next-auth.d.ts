import NextAuth from 'next-auth';

import { AuthPerms, Rank } from './custom-auth';

declare module 'next-auth' {
	type User = {
		id: string;
		username: string;
		email: string | null;
		avatar: string;

		joined: Date;
		rank: Rank;

		bannedUntil: Date | null;

		authLevel: AuthPerms;
	};

	interface Session {
		user: User;
		expires: ISODateString;
	}
}
