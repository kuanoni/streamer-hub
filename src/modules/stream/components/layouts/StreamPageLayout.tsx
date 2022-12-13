import React from 'react';
import { styled } from 'stiches.config';

import Navbar from '@components/Navbar';

import StreamProvider from '../context/StreamProvider';

type Props = {
	children: React.ReactNode;
};

const Page = styled('div', {
	display: 'grid',
	minHeight: '100vh',
	gridTemplateRows: 'auto 1fr',
	padding: '2rem',
	paddingBottom: '1rem',
});

const Main = styled('main', {
	position: 'relative',
});

const StreamPageLayout = ({ children }: Props) => {
	return (
		<StreamProvider>
			<Page>
				<Navbar fullWidth />
				<Main>{children}</Main>
			</Page>
		</StreamProvider>
	);
};

export default StreamPageLayout;
