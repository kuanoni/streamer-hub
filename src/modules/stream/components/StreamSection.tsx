import React, { useState } from 'react';
import { RelativeContainer, GridContainer } from '../styles';
import StreamControls from './StreamControls';
import StreamEmbed from './StreamEmbed';

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
