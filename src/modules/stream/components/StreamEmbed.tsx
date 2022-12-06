import Script from 'next/script';
import React, { FC, useContext, useMemo, useState } from 'react';
import { styled } from 'stiches.config';
import { AbsoluteContainer, RelativeContainer } from '../styles';
import StreamContext from './context/StreamContext';

const StreamEmbedContainer = styled(AbsoluteContainer, {
	display: 'flex',
	alignItems: 'center',
	paddingRight: '1rem',
});

const StreamEmbedWrapper = styled('div', {
	width: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	aspectRatio: '16 / 9',
});

const StyledIframe = styled('iframe', {
	aspectRatio: '16 / 9',
	border: 'medium none',
	boxShadow: 'rgba(117, 52, 223, 0.22) 0px 0px 12px 1px',
});

const StreamEmbed: FC = () => {
	const ctx = useContext(StreamContext);

	return (
		<RelativeContainer>
			<StreamEmbedContainer>
				<StreamEmbedWrapper>
					<StyledIframe
						src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
						width='100%'
						height='100%'
						title='Faker stream'
					/>
				</StreamEmbedWrapper>
			</StreamEmbedContainer>
		</RelativeContainer>
	);
};

export default StreamEmbed;
