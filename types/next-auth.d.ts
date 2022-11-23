import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { Role } from './custom-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the
	 * `SessionProvider` React Context and trpc context
	 */
	interface Session {
		user?: {
			role?: Role;
		} & DefaultSession['user'];
	}

	interface User {
		role?: Role;
	}
}
