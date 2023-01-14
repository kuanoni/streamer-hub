import React from 'react';
import { styled } from 'stiches.config';

import { Chat } from '@modules/chat/components/Chat';
import StreamPageLayout from '@modules/stream/components/layouts/StreamPageLayout';
import StreamEmbed from '@modules/stream/components/StreamEmbed';

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
	'@sm': {
		gridTemplateRows: 'auto 1fr',
		gridTemplateColumns: '1fr',
		gap: 0,
	},
});

const Stream = () => {
	return (
		<RelativeContainer>
			<GridContainer>
				<StreamEmbed />
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
