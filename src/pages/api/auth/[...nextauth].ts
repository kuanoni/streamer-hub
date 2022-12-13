import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

import { AuthPerms, Rank } from '@globalTypes/custom-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import extractStringEnvVar from '@utils/extractStringEnvVar';
import clientPromise from '@utils/mongodb';

const defaultProfile = {
	displayName: '',
	role: AuthPerms.USER,
	rank: Rank.DEFAULT,
};

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: extractStringEnvVar('GOOGLE_ID'),
			clientSecret: extractStringEnvVar('GOOGLE_SECRET'),
			profile(profile) {
				return {
					id: profile.sub,
					...defaultProfile,
				};
			},
		}),
		DiscordProvider({
			clientId: extractStringEnvVar('DISCORD_CLIENT_ID'),
			clientSecret: extractStringEnvVar('DISCORD_CLIENT_SECRET'),
			profile(profile) {
				return {
					id: profile.id,
					...defaultProfile,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, user }: any) {
			session.user = user; // Add role value to user object so it is passed along with session
			return session;
		},
		async redirect({ url }: { url: string }) {
			return url.split('#')[0];
		},
	},
	pages: {
		newUser: '/profile',
		signIn: '/#signin',
	},
};

export default NextAuth(authOptions);
