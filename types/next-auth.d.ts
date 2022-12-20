import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

import { AuthPerms } from './custom-auth';

declare module 'next-auth' {
	type User = {
		id: string;
		email?: string;
		username: string;
		joined: Date;
		authLevel: AuthPerms;
		rank: Rank;
		avatar: string;
	};

	interface Session extends DefaultSession {
		user?: User;
	}
}
