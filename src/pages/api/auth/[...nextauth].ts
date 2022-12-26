import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import { AuthPerms, Role } from '@globalTypes/custom-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import extractStringEnvVar from '@utils/extractStringEnvVar';
import clientPromise from '@utils/mongodb';

const defaultProfile = {
	username: '',
	email: null,
	role: Role.DEFAULT,

	bannedUntil: null,
	authLevel: AuthPerms.USER,
};

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: extractStringEnvVar('GOOGLE_ID'),
			clientSecret: extractStringEnvVar('GOOGLE_SECRET'),
			profile(profile: GoogleProfile) {
				return {
					id: profile.sub,
					avatar: profile.picture,
					joined: new Date(),
					...defaultProfile,
				};
			},
		}),
		DiscordProvider({
			clientId: extractStringEnvVar('DISCORD_CLIENT_ID'),
			clientSecret: extractStringEnvVar('DISCORD_CLIENT_SECRET'),
			profile(profile: DiscordProfile) {
				const avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`;

				return {
					id: profile.id,
					avatar,
					joined: new Date(),
					...defaultProfile,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, user }: any) {
			session.user = user;
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
