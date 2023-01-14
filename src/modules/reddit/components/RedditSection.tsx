import { useMemo } from 'react';
import { styled, theme } from 'stiches.config';

import Section from '@components/Home/Section';
import { CSS } from '@stitches/react';

import RedditPost from './RedditPost';

const Container = styled('div', {
	border: `1px solid ${theme.colors.grey700}`,
});

const contentCss: CSS = {
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${theme.colors.grey700}`,
};

const Header = styled('div', {
	position: 'relative',
	display: 'flex',
	padding: 12,
	border: `1px solid ${theme.colors.grey700}`,
	borderBottom: 'none',
	borderTopLeftRadius: 12,
	borderTopRightRadius: 12,
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgba(29, 155, 240, 0.1)',
		cursor: 'pointer',
	},
});

const HeaderText = styled('a', {
	flexShrink: 1,
	marginTop: 3,
	color: 'rgb(231, 233, 234)',
	fontSize: 20,
	fontWeight: 700,
	lineHeight: '24px',
	cursor: 'pointer',
});

const HeaderLink = styled('a', {
	display: 'flex',
	alignItems: 'center',
	height: 32,
	marginLeft: 'auto',
	padding: '0 16px',
	color: 'rgb(15, 20, 25)',
	backgroundColor: 'rgb(239, 243, 244)',
	borderRadius: 9999,
	fontSize: 14,
	fontWeight: 700,
	transition: '.2s',
	'&:hover': {
		backgroundColor: 'rgb(215, 219, 220)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

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
			<Section.Content css={contentCss}>
				<Header>
					<HeaderText>
						Posts from
						<br />
						/r/Destiny
					</HeaderText>
					<HeaderLink>Visit</HeaderLink>
				</Header>
				<Container>{postComponents}</Container>
			</Section.Content>
		</Section>
	);
};

export default RedditSection;
