import React from 'react';
import { styled, theme } from 'stiches.config';

import Navbar from '@components/Navbar/Navbar';
import PageFooter from '@components/PageFooter';

type Props = {
	children?: React.ReactNode;
};

const LayoutWithNavbar = ({ children }: Props) => {
	const Page = styled('div', {
		display: 'grid',
		gridTemplateColumns: `1fr min(${theme.space.pageWidth}, 100vw) 1fr`,
		gridTemplateRows: 'auto auto',
		gridTemplateAreas: `"dl content dr" "footer footer footer"`,
		minHeight: '100vh',
	});

	const PageContent = styled('div', {
		gridArea: 'content',
		display: 'flex',
		flexDirection: 'column',
		maxWidth: theme.space.pageWidth,
		padding: '2rem',
		paddingBottom: 0,
		'@sm': { padding: 0 },
	});

	const Main = styled('main', {
		position: 'relative',
		width: '100%',
		maxWidth: theme.space.pageWidth,
		margin: '1rem 0',
		'@sm': { padding: '0 1rem' },
	});

	const SideDecoration = styled('div', {
		position: 'relative',
		width: '100%',
		height: '100%',
		backgroundImage: `url('images/svg/dots.svg')`,
		backgroundRepeat: 'repeat-y',
		backgroundPosition: 'right',
		backgroundSize: '1054px 50px',
		variants: {
			pos: {
				left: {
					gridArea: 'dl',
				},
				right: {
					gridArea: 'dr',
					transform: 'rotate(180deg)',
				},
			},
		},
	});

	return (
		<Page>
			<SideDecoration pos='left' />
			<SideDecoration pos='right' />

			<PageContent>
				<Navbar />
				<Main>{children}</Main>
			</PageContent>
			<PageFooter />
		</Page>
	);
};

export default LayoutWithNavbar;
