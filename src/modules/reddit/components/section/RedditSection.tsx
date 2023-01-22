import { useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { styled, theme } from 'stiches.config';

import Section from '@components/Section';
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
	position: 'relative',
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${borderColor}`,
	cursor: 'pointer',
};

const LoaderWrapper = styled('div', {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});

type Props = {
	posts: RedditPostData[];
};

const RedditSection = ({ posts }: Props) => {
	const hasPosts = posts.length !== 0;

	const postComponents = useMemo(() => {
		return posts.map((post) => {
			return <RedditPost key={post.permalink} {...post} />;
		});
	}, [posts]);

	return (
		<Section css={{ borderRadius: '11px' }}>
			<Section.Header></Section.Header>
			<Section.Content css={contentCss}>
				{hasPosts ? (
					<>
						<RedditSectionHeader />
						<RedditPosts>{postComponents}</RedditPosts>
						<RedditSectionFooter />
					</>
				) : null}
				<LoaderWrapper>
					<ClipLoader loading={!hasPosts} color={theme.colors.grey300.toString()} size='2rem' />
				</LoaderWrapper>
			</Section.Content>
		</Section>
	);
};

export default RedditSection;
