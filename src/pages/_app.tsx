import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

type LayoutPage = NextComponentType & { getLayout?: (page: ReactElement) => ReactNode };

interface LayoutAppProps extends AppProps {
	Component: LayoutPage;
}

export default function App({ Component, pageProps }: LayoutAppProps) {
	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(<Component {...pageProps} />);
}
