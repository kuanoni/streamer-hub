import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthorizedPage from '@/components/AuthorizedPage';
import { NextComponentType, NextPageContext } from 'next';

type AuthComponent = NextComponentType & { auth: Boolean | undefined };

interface AuthAppProps extends AppProps {
	Component: AuthComponent;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AuthAppProps) {
	return (
		<SessionProvider>
			{Component.auth ? (
				<AuthorizedPage>
					<Component {...pageProps} />
				</AuthorizedPage>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}
