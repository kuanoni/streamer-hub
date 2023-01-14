import React from 'react';
import { styled } from 'stiches.config';

import { Chat } from '@modules/chat/components/Chat';
import StreamPageLayout from '@modules/stream/components/layouts/StreamPageLayout';
import StreamSection from '@modules/stream/components/StreamSection';

const RelativeContainer = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',
});

const AbsoluteContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	height: '100%',
});

const GridContainer = styled(AbsoluteContainer, {
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gap: '2rem',
});

const Stream = () => {
	return (
		<RelativeContainer>
			<GridContainer>
				<StreamSection />
				<Chat />
			</GridContainer>
		</RelativeContainer>
	);
};

export default Stream;

Stream.getLayout = function getLayout(page: JSX.Element) {
	return <StreamPageLayout>{page}</StreamPageLayout>;
};

Stream.title = 'Stream';
