import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthorizedPage from '@/components/AuthorizedPage';
import { NextComponentType, NextPageContext } from 'next';
import { ReactElement, ReactNode } from 'react';
import { ComponentAuth } from 'types/custom-auth';

type LayoutPage = NextComponentType & {
	getLayout?: (page: ReactElement) => ReactNode;
	auth: ComponentAuth | undefined;
};

interface LayoutAppProps extends AppProps {
	Component: LayoutPage;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: LayoutAppProps) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<SessionProvider>
			{Component.auth
				? getLayout(
						<AuthorizedPage auth={Component.auth}>
							<Component {...pageProps} />
						</AuthorizedPage>
				  )
				: getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
}
