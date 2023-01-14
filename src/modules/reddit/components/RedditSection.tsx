import { useMemo } from 'react';
import { styled } from 'stiches.config';

import Section from '@components/Home/Section';
import { CSS } from '@stitches/react';

import RedditPost from './RedditPost';

const borderColor = 'rgb(51, 54, 57)';

const Container = styled('article', {
	border: `1px solid ${borderColor}`,
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

const contentCss: CSS = {
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${borderColor}`,
	cursor: 'pointer',
};

const HeaderText = styled('span', {
	flexShrink: 1,
	marginTop: 3,
	color: 'rgb(231, 233, 234)',
	fontSize: 20,
	fontWeight: 700,
	lineHeight: '24px',
});

const HeaderButton = styled('button', {
	'&::before': {
		content: `Visit`,
	},
	'@md': {
		'&::before': {
			content: 'Visit on Reddit',
		},
	},

	display: 'flex',
	alignItems: 'center',
	height: 32,
	marginLeft: 'auto',
	padding: '0 16px',
	color: 'rgb(15, 20, 25)',
	backgroundColor: 'rgb(239, 243, 244)',
	borderWidth: 0,
	borderRadius: 9999,
	fontFamily: 'inherit',
	fontSize: 14,
	fontWeight: 700,
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgb(215, 219, 220)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

const Header = styled('a', {
	display: 'flex',
	padding: 12,
	border: `1px solid ${borderColor}`,
	borderBottom: 'none',
	borderTopLeftRadius: 12,
	borderTopRightRadius: 12,
	fontFamily: 'inherit',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgba(29, 155, 240, 0.1)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
	[`&:hover ${HeaderText}`]: {
		textDecoration: 'underline',
	},
});

const Footer = styled('footer', {
	padding: '24px 0',
	border: `1px solid ${borderColor}`,
	borderTop: 'none',
	borderBottomLeftRadius: 12,
	borderBottomRightRadius: 12,
	fontFamily: 'inherit',
	'&:hover': {
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

const FooterButton = styled('a', {
	display: 'flex',
	alignItems: 'center',
	width: 'min-content',
	height: 36,
	margin: '0 auto',
	padding: '0 16px',
	color: '#fff',
	backgroundColor: 'hsl(32, 100%, 44%)',
	borderWidth: 0,
	borderRadius: 9999,
	fontFamily: 'inherit',
	fontSize: 15,
	fontWeight: 700,
	whiteSpace: 'nowrap',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'hsl(32, 100%, 39%)',
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
				<Header href='https://www.reddit.com/r/Destiny/' target='_blank'>
					<HeaderButton>Visit</HeaderButton>
					<HeaderText>Posts from /r/Destiny</HeaderText>
				</Header>
				<Container>{postComponents}</Container>
				<Footer>
					<FooterButton href='https://www.reddit.com/r/Destiny/' target='_blank'>
						View more on Reddit
					</FooterButton>
				</Footer>
			</Section.Content>
		</Section>
	);
};

export default RedditSection;
