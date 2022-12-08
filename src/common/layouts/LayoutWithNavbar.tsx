import Navbar from '@/components/Navbar';
import React from 'react';
import { styled } from 'stiches.config';

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
	});

	return (
		<Page>
			<Navbar />
			<Main>{children}</Main>
		</Page>
	);
};

export default LayoutWithNavbar;
