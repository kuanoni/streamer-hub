import React, { useState } from 'react';
import { RelativeContainer, GridContainer } from '../styles';
import StreamControls from './StreamControls';
import StreamEmbed from './StreamEmbed';

const StreamSection = () => {
	return (
		<RelativeContainer>
			<GridContainer>
				<StreamControls />
				<StreamEmbed />
			</GridContainer>
		</RelativeContainer>
	);
};

export default StreamSection;
