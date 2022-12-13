import React from 'react';
import { styled, theme } from 'stiches.config';

import Navbar from '@components/Navbar';

type Props = {
	children?: React.ReactNode;
};

const LayoutWithNavbar = ({ children }: Props) => {
	const Page = styled('div', {
		display: 'grid',
		minHeight: '100vh',
		gridTemplateRows: 'auto 1fr',
		padding: '2rem',
	});

	const Main = styled('main', {
		position: 'relative',
		width: '100%',
		maxWidth: theme.space.pageWidth,
		margin: '0 auto',
		marginTop: '1rem',
	});

	return (
		<Page>
			<Navbar />
			<Main>{children}</Main>
		</Page>
	);
};

export default LayoutWithNavbar;
