// only works with JWT strategy
import { withAuth } from 'next-auth/middleware';

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		// console.log(req.nextauth.token)
	},
	{
		// middleware options
		callbacks: {
			authorized: ({ token }) => token?.role === 'admin',
		},
	}
);

export const config = { matcher: ['/admin/:path*'] };
