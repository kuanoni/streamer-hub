import React from 'react';
import { styled } from 'stiches.config';

import Navbar from '@components/Navbar/Navbar';

import StreamProvider from '../context/StreamProvider';

type Props = {
	children: React.ReactNode;
};

const Page = styled('div', {
	display: 'grid',
	minHeight: '100vh',
	maxWidth: '100vw',
	gridTemplateRows: 'auto 1fr',
	padding: '2rem',
	paddingBottom: '1rem',
	'@sm': { padding: 0 },
	'@l_xs': { padding: '.5rem' },
});

const Main = styled('main', {
	position: 'relative',

	'@sm': { padding: '.5rem', minHeight: '-webkit-fill-available' },
	'@l_xs': { height: '100vh' },
});

const StreamPageLayout = ({ children }: Props) => {
	return (
		<StreamProvider>
			<Page>
				<Navbar />
				<Main>{children}</Main>
			</Page>
		</StreamProvider>
	);
};

export default StreamPageLayout;
