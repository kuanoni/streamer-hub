import NextAuth, { DefaultUser } from 'next-auth';

import { AuthPerms } from './custom-auth';

declare module 'next-auth' {
	interface User {
		authLevel: AuthPerms;
		username: string;
	}

	interface Session {
		user: User & DefaultSession['user'];
	}
}
