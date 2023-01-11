import { styled } from 'stiches.config';

import MerchSection from '@components/Home/MerchSection';
import RedditSection from '@components/Home/RedditSection';
import Section from '@components/Home/Section';
import TwitterSection from '@components/Home/TwitterSection';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import fetchRedditPosts from '@utils/fetchRedditPosts';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	marginTop: '1rem',
});

const Row = styled('div', {
	display: 'flex',
	gap: '1rem',
	justifyContent: 'stretch',
});

interface Props {
	posts: RedditPostData[];
}

const Home = ({ posts }: Props) => {
	return (
		<Container>
			<MerchSection />
			<Row>
				<TwitterSection maxHeight={350} />
				<RedditSection posts={posts} maxHeight={350} />
			</Row>
			<Section>
				<Section.Header>Videos</Section.Header>
				<Section.Content>content</Section.Content>
			</Section>
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
