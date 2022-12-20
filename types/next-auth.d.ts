import NextAuth from 'next-auth';

import { AuthPerms } from './custom-auth';

declare module 'next-auth' {
	interface User {
		role: AuthPerms;
		username: string;
	}

	interface Session {
		user: User & DefaultSession['user'];
	}
}
