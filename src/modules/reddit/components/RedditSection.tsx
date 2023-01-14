import { useMemo } from 'react';
import { styled, theme } from 'stiches.config';

import Section from '@components/Home/Section';
import { CSS } from '@stitches/react';

import RedditPost from './RedditPost';

const Container = styled('div', {
	borderRadius: 12,
	border: `1px solid ${theme.colors.grey700}`,
});

const contentCss: CSS = {
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${theme.colors.grey700}`,
};

type Props = {
	posts: RedditPostData[];
};

const RedditSection = ({ posts }: Props) => {
	const postComponents = useMemo(() => {
		return posts.map((post) => {
			return <RedditPost key={post.permalink} {...post} />;
		});
	}, [posts]);

	return (
		<Section css={{ border: 'none' }}>
			<Section.Content css={contentCss}>
				<Container>{postComponents}</Container>
			</Section.Content>
		</Section>
	);
};

export default RedditSection;
