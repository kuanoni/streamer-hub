import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthorizedPageWrapper from '@/components/AuthorizedPageWrapper';
import { Page } from 'types/custom-auth';

interface PageAppProps extends AppProps {
	Component: Page;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: PageAppProps) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<SessionProvider>
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
