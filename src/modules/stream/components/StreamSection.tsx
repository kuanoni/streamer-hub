import React from 'react';
import { styled } from 'stiches.config';
import { RelativeContainer, AbsoluteContainer } from '../styles';
import StreamEmbed from './StreamEmbed';

const StreamEmbedContainer = styled(AbsoluteContainer, {
	height: 'calc(100% - 1rem)',
	marginTop: '1rem',
});

const StreamSection = () => {
	return (
		<RelativeContainer>
			<StreamEmbedContainer>
				<StreamEmbed />
			</StreamEmbedContainer>
		</RelativeContainer>
	);
};

export default StreamSection;
