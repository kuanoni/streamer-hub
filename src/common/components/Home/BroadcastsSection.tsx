import { YOUTUBE_CHANNEL_ID } from 'src/common/constants/socialMedia';
import { styled, theme } from 'stiches.config';

import Section from '@components/Section';
import YoutubeThumbnail from '@modules/youtube/components/YoutubeThumbnail';
import { CSS } from '@stitches/react';

const contentCss: CSS = {
	position: 'relative',
	overflowY: 'scroll',
	height: '100%',
	'@sm': { minHeight: 275 },
};

const PastBroadcasts = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, min-content)',
	gap: '.5rem',
	padding: '.5rem 1rem',
	'@sm': {
		gridTemplateColumns: '1fr 1fr !important',
		gridTemplateRows: 'repeat(6, 1fr)',
		padding: '.5rem',
	},
});

const Fallback = styled('div', {
	padding: '1rem',
	h1: {
		margin: 0,
		fontStyle: 'italic',
	},
	p: {
		margin: 0,
		color: theme.colors.textMedium,
	},
});

interface Props {
	pastBroadcasts: YoutubeVideoData[];
	livestream: YoutubeVideoData | null;
}

const BroadcastsSection = ({ pastBroadcasts, livestream }: Props) => {
	const pastBroadcastsCss: CSS = !livestream
		? { position: 'relative', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: '1fr' }
		: {};

	return (
		<Section>
			<Section.Header>Past Broadcasts</Section.Header>
			<Section.Content css={contentCss}>
				{pastBroadcasts.length ? (
					<PastBroadcasts css={pastBroadcastsCss}>
						{pastBroadcasts.map((broadcast) => (
							<YoutubeThumbnail
								key={broadcast.videoId}
								videoId={broadcast.videoId}
								thumbnails={broadcast.thumbnails}
							/>
						))}
					</PastBroadcasts>
				) : (
					<Fallback>
						<h1>Failed to load Youtube broadcasts...</h1>
						<p>
							Visit the channel <a href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}>here</a>{' '}
							instead.
						</p>
					</Fallback>
				)}
			</Section.Content>
		</Section>
	);
};

export default BroadcastsSection;
