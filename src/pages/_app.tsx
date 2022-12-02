import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthorizedPageWrapper from '@/components/AuthorizedPageWrapper';
import { Page } from 'types/custom-auth';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

interface PageAppProps extends AppProps {
	Component: Page;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: PageAppProps) {
	const getLayout = Component.getLayout || ((page) => page);
	const { asPath } = useRouter();

	// this memoization is to prevent route hash changes from re-rendering the entire page
	// https://github.com/vercel/next.js/issues/34729
	const component = useMemo(() => {
		if (Component.authorizationOptions)
			return getLayout(
				<AuthorizedPageWrapper authorizationOptions={Component.authorizationOptions}>
					<Component {...pageProps} />
				</AuthorizedPageWrapper>
			);
		else return getLayout(<Component {...pageProps} />);
	}, [Component, asPath.replace(/#\w+$/, '')]);

	return <SessionProvider>{component}</SessionProvider>;
}
