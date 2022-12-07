import Navbar from '@/components/Navbar';
import StreamEmbedSelector from '@/modules/stream/components/StreamEmbedSelector';
import React, { useState } from 'react';
import { styled } from 'stiches.config';
import StreamContext, { StreamSource, StreamProviderIface } from '../context/StreamContext';

type Props = {
	children?: React.ReactNode;
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
	const [streamSource, setStreamSource] = useState<StreamSource>('twitch');

	const providerValue: StreamProviderIface = {
		streamSource,
		setStreamSource,
	};

	return (
		<StreamContext.Provider value={providerValue}>
			<Page>
				<Navbar />
				<Main>{children}</Main>
			</Page>
		</StreamContext.Provider>
	);
};

export default StreamPageLayout;
