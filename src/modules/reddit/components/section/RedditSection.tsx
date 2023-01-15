import { useMemo } from 'react';
import { styled } from 'stiches.config';

import Section from '@components/Home/Section';
import { CSS } from '@stitches/react';

import { borderColor } from '../../common';
import RedditPost from '../post/RedditPost';
import RedditSectionFooter from './RedditSectionFooter';
import RedditSectionHeader from './RedditSectionHeader';

const RedditPosts = styled('article', {
	border: `1px solid ${borderColor}`,
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

const contentCss: CSS = {
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${borderColor}`,
	cursor: 'pointer',
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
		<Section css={{ borderRadius: '11px' }}>
			<Section.Header></Section.Header>
			<Section.Content css={contentCss}>
				<RedditSectionHeader />
				<RedditPosts>{postComponents}</RedditPosts>
				<RedditSectionFooter />
			</Section.Content>
		</Section>
	);
};

export default RedditSection;
