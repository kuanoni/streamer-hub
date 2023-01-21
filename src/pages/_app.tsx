import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { ReactElement, useState } from 'react';
import { theme } from 'stiches.config';

import AuthorizedPageWrapper from '@components/AuthorizedPageWrapper';
import { Page } from '@globalTypes/authorized-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface PageAppProps extends AppProps {
	Component: Page;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: PageAppProps) {
	const [queryClient] = useState(() => new QueryClient());
	const getLayout = Component.getLayout || ((page: ReactElement) => page);

	const siteTitle = 'KroyOoz.tv';

	const pageTitle = Component.title ? `${Component.title} | ${siteTitle}` : siteTitle;
	const pageDescription = Component.description ? `` : '';
	const previewImage = '/images/previewImage.png';

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta name='title' content={pageTitle} />
				<meta name='description' content={pageDescription} />
				<meta charSet='utf-8' />

				{/* Open Graph / Facebook */}
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://streamer-hub.fly.dev/' />
				<meta property='og:title' content={pageTitle} />
				<meta property='og:description' content={pageDescription} />
				<meta property='og:image' content={previewImage} />

				{/* Twitter */}
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://streamer-hub.fly.dev/' />
				<meta property='twitter:title' content={pageTitle} />
				<meta property='twitter:description' content={pageDescription} />
				<meta property='twitter:image' content={previewImage} />

				<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
				<meta name='theme-color' content='#090408' />
				<meta name='msapplication-navbutton-color' content='#090408' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
			</Head>

			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					<NextNProgress color={theme.colors.secondary500.toString()} />
					{Component.authorizationOptions
						? getLayout(
								<AuthorizedPageWrapper authorizationOptions={Component.authorizationOptions}>
									<Component {...pageProps} />
								</AuthorizedPageWrapper>
						  )
						: getLayout(<Component {...pageProps} />)}
				</SessionProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}
