import { styled } from 'stiches.config';

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

const Row = styled('div', {
	display: 'grid',
	gridTemplateColumns: '64fr minmax(305px, 36fr)',
	gridTemplateRows: '1fr',
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
const YOUTUBE_CHANNEL_ID = 'UCK3kaNXbB57CLcyhtccV_yw';

interface Props {
	posts: RedditPostData[];
	videos: YoutubeVideoData[];
}

const Home = ({ posts, videos }: Props) => {
	return (
		<Container>
			<MerchSection />
			<Row>
				<VideosSection videos={videos} />
				<ColumnWrapper>
					<ColumnContainer>
						<RedditSection posts={posts} />
						<TwitterSection username={TWITTER_USERNAME} />
					</ColumnContainer>
				</ColumnWrapper>
			</Row>
		</Container>
	);
};

export async function getStaticProps() {
	const posts = await fetchRedditPosts(SUBREDDIT_NAME);
	const videos = await fetchYoutubeVideos(YOUTUBE_CHANNEL_ID);

	const props: Props = {
		posts,
		videos,
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
