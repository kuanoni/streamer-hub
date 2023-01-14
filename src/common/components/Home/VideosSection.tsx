import { styled, theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import Section from './Section';
import YoutubeThumbnail from './YoutubeThumbnail';

const contentCss: CSS = {
	padding: '.5rem 1rem',
	'@xs': { padding: '.5rem' },
};

const RecentVideos = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	justifyContent: 'stretch',
	gap: '1rem',
	'@xs': { gap: '.5rem' },
});

const RecentVideosTitle = styled('h3', {
	gridColumn: '1 / -1',
	margin: '.5rem 0',
});

const Feature = styled('article', {
	width: '100%',
	marginBottom: '4rem',
	backgroundColor: theme.colors.grey900,
	borderRadius: theme.space.borderRad,
	'@sm': { marginBottom: '2rem' },
});

const FeatureContent = styled('div', {});

const FeatureTitle = styled('h2', {
	marginTop: '.5rem',
	marginBottom: 0,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
});

const FeatureDescription = styled('p', {
	margin: 0,
	color: theme.colors.textMedium,
});

const featuredVideoId = '-A9Gl9dITk4';

const videoIds = ['adtOYmFdiCc', 'F18gVafNzc0', 'lh9sN4wm2qo', 'Ll9SOTC9o_8', 'HRz_6YUU6Sg', 'bX8IQf2z_Z8'];

interface Props {}

const VideosSection = ({}: Props) => {
	return (
		<Section>
			<Section.Header>Videos</Section.Header>
			<Section.Content css={contentCss}>
				<Feature>
					<YoutubeThumbnail videoId={featuredVideoId} resolution='hd' />
					<FeatureContent>
						<FeatureTitle>{`Andrew Tate Self Snitches In Chat Logs, Didn't Expect To Be Caught`}</FeatureTitle>
						<FeatureDescription>
							Destiny reacts to latest Andrew Tate updates from criminal lawyer Bruce Rivers, Romanian
							TVee and DJ Akademiks...
						</FeatureDescription>
					</FeatureContent>
				</Feature>
				<RecentVideosTitle>Recent videos</RecentVideosTitle>
				<RecentVideos>
					{videoIds.map((id) => (
						<YoutubeThumbnail key={id} videoId={id} resolution='hd' />
					))}
				</RecentVideos>
			</Section.Content>
		</Section>
	);
};

export default VideosSection;
