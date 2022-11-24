import NextAuth from 'next-auth';
import { Role } from './custom-auth';

declare module 'next-auth' {
	interface User {
		role: Role;
		displayName: string;
	}

	interface Session {
		user: User & DefaultSession['user'];
	}
}
