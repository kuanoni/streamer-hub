import React from 'react';
import { RelativeContainer, AbsoluteContainer } from '../styles';
import StreamEmbed from './StreamEmbed';

const StreamSection = () => {
	return (
		<RelativeContainer>
			<AbsoluteContainer>
				<StreamEmbed />
			</AbsoluteContainer>
		</RelativeContainer>
	);
};

export default StreamSection;
