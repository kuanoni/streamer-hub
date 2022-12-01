import extractStringEnvVar from '@/utils/extractStringEnvVar';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/utils/mongodb';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { AuthPerms, Rank } from 'types/custom-auth';

const defaultProfile = {
	displayName: '',
	role: AuthPerms.USER,
	rank: Rank.DEFAULT,
};

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: extractStringEnvVar('GOOGLE_ID'),
			clientSecret: extractStringEnvVar('GOOGLE_SECRET'),
			profile(profile) {
				return {
					id: profile.sub,
					displayName: '',
					email: profile.email,
					emailVerified: profile.email_verified,
					role: AuthPerms.USER,
					rank: Rank.DEFAULT,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, user }: any) {
			session.user = user; // Add role value to user object so it is passed along with session
			return session;
		},
	},
	pages: {
		newUser: '/profile',
	},
};

export default NextAuth(authOptions);
