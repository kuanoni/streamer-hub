import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

export enum Role {
	ADMIN,
	USER,
}

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

export interface ComponentAuth {
	role: Role;
	loading: React.ReactNode;
	unauthorized: string;
}
