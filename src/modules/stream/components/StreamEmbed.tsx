import React, { FC, useContext } from 'react';
import { styled } from 'stiches.config';
import { AbsoluteContainer, RelativeContainer } from '../styles';
import StreamContext from './context/StreamContext';

const StreamEmbedContainer = styled(AbsoluteContainer, {
	display: 'flex',
	alignItems: 'center',
});

const StreamEmbedWrapper = styled('div', {
	width: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	aspectRatio: '16 / 9',
});

const StyledIframe = styled('iframe', {
	aspectRatio: '16 / 9',
	border: 'none',
	boxShadow: 'rgba(117, 52, 223, 0.22) 0px 0px 12px 1px',
});

const StreamEmbed: FC = () => {
	const ctx = useContext(StreamContext);

	return (
		<RelativeContainer>
			<StreamEmbedContainer>
				<StreamEmbedWrapper>
					{ctx?.streamSource === 'twitch' ? (
						<StyledIframe
							src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
							width='100%'
							height='100%'
							title='Faker stream'
						/>
					) : ctx?.streamSource === 'youtube' ? (
						<StyledIframe
							width='100%'
							height='100%'
							src='https://www.youtube.com/embed/live_stream?channel=UCM2fsEsL6rW99JYMPFmwgtA'
						/>
					) : (
						''
					)}
				</StreamEmbedWrapper>
			</StreamEmbedContainer>
		</RelativeContainer>
	);
};

export default StreamEmbed;
