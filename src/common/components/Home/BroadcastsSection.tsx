import { styled, theme } from 'stiches.config';

import Section from '@components/Section';
import YoutubeThumbnail from '@modules/youtube/components/YoutubeThumbnail';
import { CSS } from '@stitches/react';

const contentCss: CSS = {
	position: 'relative',
	overflowY: 'scroll',
	height: '100%',
	'@xs': { padding: '.5rem' },
};

const PastBroadcasts = styled('div', {
	position: 'absolute',
	inser: '0 0 0 0',
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, min-content)',
	gap: '.5rem',
	padding: '.5rem 1rem',
});

interface Props {
	pastBroadcasts: YoutubeVideoData[];
}

const BroadcastsSection = ({ pastBroadcasts }: Props) => {
	return (
		<Section>
			<Section.Header>Past Broadcasts</Section.Header>
			<Section.Content css={contentCss}>
				<PastBroadcasts>
					{pastBroadcasts.map((broadcast) => (
						<YoutubeThumbnail
							key={broadcast.videoId}
							videoId={broadcast.videoId}
							thumbnails={broadcast.thumbnails}
						/>
					))}
				</PastBroadcasts>
			</Section.Content>
		</Section>
	);
};

export default BroadcastsSection;
