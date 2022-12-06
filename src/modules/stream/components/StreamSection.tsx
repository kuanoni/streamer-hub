import React, { useState } from 'react';
import { styled } from 'stiches.config';
import StreamControls from './StreamControls';
import StreamEmbed from './StreamEmbed';

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
	gridTemplateRows: 'auto 1fr',
});

const StreamSection = () => {
	const [streamSource, setStreamSource] = useState('twitch');
	return (
		<RelativeContainer>
			<GridContainer>
				<StreamControls streamSource={streamSource} setStreamSource={setStreamSource} />
				<StreamEmbed streamSource={streamSource} />
			</GridContainer>
		</RelativeContainer>
	);
};

export default StreamSection;
