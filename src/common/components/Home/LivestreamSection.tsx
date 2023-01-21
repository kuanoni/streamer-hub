import { styled, theme } from 'stiches.config';

import Section from '@components/Section';
import YoutubeThumbnail from '@modules/youtube/components/YoutubeThumbnail';
import { CSS } from '@stitches/react';

const contentCss: CSS = {
	display: 'flex',
	gap: '.5rem',
	height: 'min-content',
	'@xs': { padding: '.5rem' },
};

const Livestream = styled('article', {
	width: '100%',
	maxHeight: '100%',
	padding: '.5rem 1rem',
	h2: { margin: 0 },
});

const LiveBadge = styled('span', {
	display: 'inline',
	padding: '0px .25em',
	marginLeft: '.5em',
	color: theme.colors.textLightActive,
	backgroundColor: '#e30000',
	borderRadius: theme.space.borderRad,
});

interface Props {
	livestream: YoutubeVideoData | null;
}

const LivestreamSection = ({ livestream }: Props) => {
	return (
		<Section>
			<Section.Header>
				Livestream
				<LiveBadge>LIVE</LiveBadge>
			</Section.Header>
			<Section.Content css={contentCss}>
				<Livestream>
					{livestream && <YoutubeThumbnail videoId={livestream.videoId} thumbnails={livestream.thumbnails} />}
				</Livestream>
			</Section.Content>
		</Section>
	);
};

export default LivestreamSection;
