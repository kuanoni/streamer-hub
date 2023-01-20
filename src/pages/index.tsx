import { styled } from 'stiches.config';

import BroadcastsSection from '@components/Home/BroadcastsSection';
import LivestreamSection from '@components/Home/LivestreamSection';
import MerchSection from '@components/Home/MerchSection';
import TwitterSection from '@components/Home/TwitterSection';
import VideosSection from '@components/Home/VideosSection';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import fetchRedditPosts from '@modules/reddit/api/fetchRedditPosts';
import RedditSection from '@modules/reddit/components/section/RedditSection';
import fetchYoutubeVideos from '@modules/youtube/api/fetchYoutubeVideos';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	marginTop: '2rem',
	'@md': { gap: '1rem' },
	'@sm': { marginTop: '.5rem', gap: '2rem' },
});

const VideosAndSocialsRow = styled('div', {
	display: 'grid',
	gridTemplateColumns: '64fr minmax(305px, 36fr)',
	gridTemplateRows: '1fr',
	placeItems: 'stretch',
	gap: '2rem',
	'@md': { gap: '1rem' },
	'@sm': { gridTemplateColumns: '1fr', gap: '2rem' },
});

const LivestreamAndBroadcastsRow = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridTemplateRows: 'min-content',
	placeItems: 'stretch',
	gap: '2rem',
	'@md': { gap: '1rem' },
	'@sm': { gridTemplateColumns: '1fr', gap: '2rem' },
});

const ColumnWrapper = styled('div', {
	position: 'relative',
});

const ColumnContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	'& > *': {
		height: '50%',
	},
	'@sm': {
		position: 'static',
		gap: '2rem !important',
		'& > *': {
			height: 400,
			maxHeight: '80vh',
		},
	},
	'@md': { gap: '1rem' },
});

const SUBREDDIT_NAME = 'Jerma985';
const TWITTER_USERNAME = 'Jerma985';
// const YOUTUBE_CHANNEL_ID = 'UCL7DDQWP6x7wy0O6L5ZIgxg';
const YOUTUBE_CHANNEL_ID = 'UCsj_gOOEmCb73tgbjnUdUkg';
// const YOUTUBE_CHANNEL_ID = 'UC554eY5jNUfDq3yDOJYirOQ';

interface Props {
	posts: RedditPostData[];
	videos: YoutubeVideoData[];
	pastBroadcasts: YoutubeVideoData[];
	livestream: YoutubeVideoData | null;
}

const Home = ({ posts, videos, pastBroadcasts, livestream }: Props) => {
	return (
		<Container>
			<LivestreamAndBroadcastsRow>
				<LivestreamSection livestream={livestream} />
				<BroadcastsSection pastBroadcasts={pastBroadcasts} />
			</LivestreamAndBroadcastsRow>
			<MerchSection />
			<VideosAndSocialsRow>
				<VideosSection videos={videos} />
				<ColumnWrapper>
					<ColumnContainer>
						<TwitterSection username={TWITTER_USERNAME} />
						<RedditSection subredditName={SUBREDDIT_NAME} posts={posts} />
					</ColumnContainer>
				</ColumnWrapper>
			</VideosAndSocialsRow>
		</Container>
	);
};

export async function getStaticProps() {
	const posts = await fetchRedditPosts(SUBREDDIT_NAME);

	const videosAndBroadcasts = await fetchYoutubeVideos(YOUTUBE_CHANNEL_ID);
	const pastBroadcasts = (await fetchYoutubeVideos(YOUTUBE_CHANNEL_ID, true))
		.filter(
			(broadcast) => broadcast.liveBroadcastContent !== 'live' && broadcast.liveBroadcastContent !== 'upcoming'
		)
		.slice(0, 6);

	const livestream = videosAndBroadcasts.find((video) => video.liveBroadcastContent === 'live') || null;

	// filter broadcasts out of video array
	const broadcastIds = pastBroadcasts.map((broadcast) => broadcast.videoId);
	const videos = videosAndBroadcasts.filter((video) => !broadcastIds.includes(video.videoId)).slice(0, 8);

	const props: Props = {
		posts,
		videos,
		pastBroadcasts,
		livestream,
	};

	return {
		props,
		revalidate: 10,
	};
}

Home.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Home.description = 'Home';

export default Home;
