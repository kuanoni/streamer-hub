import extractStringEnvVar from '@/utils/extractStringEnvVar';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/utils/mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { AuthPerms, Rank } from 'types/custom-auth';

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
	},
	pages: {
		newUser: '/profile',
	},
};

export default NextAuth(authOptions);
