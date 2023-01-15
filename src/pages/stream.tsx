import React, { useEffect } from 'react';
import { styled } from 'stiches.config';

import { Chat } from '@modules/chat/components/Chat';
import StreamPageLayout from '@modules/stream/components/layouts/StreamPageLayout';
import StreamEmbed from '@modules/stream/components/StreamEmbed';

const RelativeContainer = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',

	'@sm': { height: 'calc(100vh - 1rem)' },
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
	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, []);

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
