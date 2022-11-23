import extractStringEnvVar from '@/utils/extractStringEnvVar';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/utils/mongodb';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: extractStringEnvVar('GOOGLE_ID'),
			clientSecret: extractStringEnvVar('GOOGLE_SECRET'),
		}),
	],
	callbacks: {
		async session({ session, token, user }: any) {
			session.user.role = user.role; // Add role value to user object so it is passed along with session
			return session;
		},
	},
};

export default NextAuth(authOptions);
