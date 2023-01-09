import { format, formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import Image from 'next/image';
import { useMemo } from 'react';
import { styled, theme } from 'stiches.config';

import selfPostThumbnail from '@images/self_post_thumbnail.png';

import Section from './Section';

const PostThumbnail = styled(Image, {
	gridArea: 'thumb',
	height: 64,
	width: 64,
	marginTop: '.25em',
});

const PostTitle = styled('a', {
	color: theme.colors.textLight,
	'&:hover': {
		textDecoration: 'underline',
	},
});

const PostAuthor = styled('div', {
	color: theme.colors.textMedium,
	fontSize: '0.9em',
});

const PostFooter = styled('footer', {
	gridArea: 'footer',
	display: 'flex',
	marginTop: '.5rem',
	time: {
		color: theme.colors.textDark,
		fontSize: '0.9em',
	},
});

const Post = styled('article', {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'repeat(3, auto)',
	gridTemplateAreas: `"thumb text" "thumb text" "thumb footer"`,
	columnGap: '1rem',
	padding: '.5rem',
	border: `1px solid ${theme.colors.grey900}`,
	'&:hover': {
		// backgroundColor: theme.colors.grey900,
	},
	'&:not(:last-child)': {
		borderBottom: 'none',
	},
});

type Props = {
	posts: RedditPost[];
};

const RedditSection = ({ posts }: Props) => {
	const postComponents = useMemo(() => {
		const components: React.ReactNode[] = [];

		// only use 3 posts
		for (let i = 0; i < 3; i++) {
			const { author, title, permalink, thumbnail, created_utc } = posts[i].data;

			const timeFromUnix = fromUnixTime(created_utc);
			const timeAgo = formatDistanceToNowStrict(timeFromUnix);
			const timeFormatted = format(timeFromUnix, 'yyy-MM-dd, HH:mm:ss');

			components.push(
				<Post key={i}>
					{thumbnail === 'self' ? (
						<PostThumbnail src={selfPostThumbnail} alt='thumbnail' />
					) : (
						<PostThumbnail src={thumbnail} alt='thumbnail' width={140} height={140} />
					)}
					<div>
						<PostTitle href={`https://reddit.com${permalink}`} target='_blank'>
							{title}
						</PostTitle>
						<PostAuthor>{`By ${author}`}</PostAuthor>
					</div>
					<PostFooter>
						<time title={timeFormatted}>{`${timeAgo} ago`}</time>
					</PostFooter>
				</Post>
			);
		}

		return components;
	}, [posts]);

	return (
		<Section>
			<Section.Header>Reddit</Section.Header>
			<Section.Content>{postComponents}</Section.Content>
		</Section>
	);
};

export default RedditSection;
