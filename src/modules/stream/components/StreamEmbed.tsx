import React, { useContext } from 'react';
import { YOUTUBE_CHANNEL_ID } from 'src/common/constants/socialMedia';
import { styled, theme } from 'stiches.config';

import fetchLivestreamData from '@modules/youtube/utils/fetchLivestreamData';
import { useQuery } from '@tanstack/react-query';

import StreamContext from './context/StreamContext';

const StreamEmbedContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	padding: '1rem 0',
	backgroundSize: 300,
	backgroundRepeat: 'repeat',
	backgroundImage: `url("/images/svg/stripesBg.svg")`,
	'@sm': {
		width: 513,
		maxWidth: '90%',
		height: '100%',
		maxHeight: '35vh',
		padding: 0,
		aspectRatio: '16 / 9',
	},
	'@xs': {
		width: '100%',
		height: 'auto',
	},
});

const StreamEmbedWrapper = styled('div', {
	width: '100%',
	maxHeight: '100%',
	margin: '0 auto',
	aspectRatio: '16 / 9',
});

const StyledIframe = styled('iframe', {
	aspectRatio: '16 / 9',
	backgroundColor: theme.colors.primary900,
	border: 'none',
	boxShadow: 'rgba(117, 52, 223, 0.22) 0px 0px 12px 1px',
});

const NoStreamIndicator = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	border: 'none',
	boxShadow: 'rgba(117, 52, 223, 0.22) 0px 0px 12px 1px',
	aspectRatio: '16 / 9',
	backgroundColor: theme.colors.primary900,
	backgroundImage: `url('/images/svg/streamOfflineBg.svg')`,
	backgroundSize: 1200,
	'@sm': { backgroundSize: 900 },
	'@xs': { backgroundSize: '900px' },
});

const StreamEmbed = () => {
	const domain = process.env.NODE_ENV === 'development' ? 'localhost' : 'streamer-hub.fly.dev';

	const { data: livestreamData } = useQuery<LivestreamData>(['livestreamData'], fetchLivestreamData, {
		staleTime: 1000 * 60 * 1,
	});

	return (
		<StreamEmbedContainer>
			<StreamEmbedWrapper>
				{livestreamData?.live ? (
					<StyledIframe
						width='100%'
						height='100%'
						src={`https://www.youtube.com/embed/live_stream?autoplay=1&disablekb=1&modestbranding=1&playsinline=1&channel=${YOUTUBE_CHANNEL_ID}&origin=${domain}`}
					/>
				) : (
					<NoStreamIndicator />
				)}
			</StreamEmbedWrapper>
		</StreamEmbedContainer>
	);
};

export default StreamEmbed;
