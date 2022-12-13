import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthorizedPageWrapper from '@components/AuthorizedPageWrapper';
import { Page } from '@types/custom-auth';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { theme } from 'stiches.config';

interface PageAppProps extends AppProps {
	Component: Page;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: PageAppProps) {
	const getLayout = Component.getLayout || ((page) => page);
	const pageTitle = `${Component.title || 'Unnamed'} | Stream Hub`;

	return (
		<SessionProvider>
			<Head>
				<title>{pageTitle}</title>
				<meta property='og:title' content={pageTitle} key='title' />
			</Head>

			<NextNProgress color={theme.colors.trinary500.toString()} />
			{Component.authorizationOptions
				? getLayout(
						<AuthorizedPageWrapper authorizationOptions={Component.authorizationOptions}>
							<Component {...pageProps} />
						</AuthorizedPageWrapper>
				  )
				: getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
}
