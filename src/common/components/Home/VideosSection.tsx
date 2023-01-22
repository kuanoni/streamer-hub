import { styled, theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import YoutubeThumbnail from '../../../modules/youtube/components/YoutubeThumbnail';
import Section from '../Section';

const contentCss: CSS = {
	padding: '.5rem 1rem',
	minHeight: 600,
	'@sm': { minHeight: 'auto' },
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

const Fallback = styled('div', {
	padding: '.5rem 0',
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
	videos: YoutubeVideoData[];
}

const VideosSection = ({ videos }: Props) => {
	const featuredVideo = videos[0];

	return (
		<Section>
			<Section.Header>Recent Videos</Section.Header>
			<Section.Content css={contentCss}>
				{videos.length ? (
					<>
						<Feature>
							<YoutubeThumbnail
								videoId={featuredVideo.videoId}
								thumbnails={featuredVideo.thumbnails}
								resolution='maxres'
							/>
							<FeatureContent>
								<FeatureTitle>{featuredVideo.title}</FeatureTitle>
								<FeatureDescription>{featuredVideo.description}</FeatureDescription>
							</FeatureContent>
						</Feature>
						<RecentVideosTitle>Other videos</RecentVideosTitle>
						<RecentVideos>
							{videos.slice(1, 7).map((video) => (
								<YoutubeThumbnail
									key={video.videoId}
									videoId={video.videoId}
									thumbnails={video.thumbnails}
								/>
							))}
						</RecentVideos>
					</>
				) : (
					<Fallback>
						<h1>Failed to load Youtube videos...</h1>
						<p>
							Visit the channel <a href='#'>here</a> instead.
						</p>
					</Fallback>
				)}
			</Section.Content>
		</Section>
	);
};

export default VideosSection;
