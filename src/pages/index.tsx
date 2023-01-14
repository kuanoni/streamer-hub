import { styled } from 'stiches.config';

import MerchSection from '@components/Home/MerchSection';
import TwitterSection from '@components/Home/TwitterSection';
import VideosSection from '@components/Home/VideosSection';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import fetchRedditPosts from '@modules/reddit/api/fetchRedditPosts';
import RedditSection from '@modules/reddit/components/RedditSection';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	marginTop: '2rem',
});

const Row = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr minmax(auto, 400px)',
	gridTemplateRows: '1fr',
	placeItems: 'stretch',
	gap: '2rem',
});

const ColumnWrapper = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: '1rem',
});

const ColumnContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	'& > *': {
		height: '50%',
	},
});

interface Props {
	posts: RedditPostData[];
}

const Home = ({ posts }: Props) => {
	return (
		<Container>
			<MerchSection />
			<Row>
				<VideosSection />
				<ColumnWrapper>
					<ColumnContainer>
						<TwitterSection />
						<RedditSection posts={posts} />
					</ColumnContainer>
				</ColumnWrapper>
			</Row>
		</Container>
	);
};

export async function getStaticProps() {
	const posts = await fetchRedditPosts();

	return {
		props: {
			posts,
		},
		revalidate: 10,
	};
}

Home.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Home.title = 'Home';

export default Home;
