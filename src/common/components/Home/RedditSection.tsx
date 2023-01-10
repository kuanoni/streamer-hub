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
	marginBottom: '.25em',
	color: theme.colors.textMedium,
	fontSize: '0.9em',
});

const PostTime = styled('time', {
	color: theme.colors.textDark,
	fontSize: '0.9em',
});

const PostContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
});

const Post = styled('article', {
	display: 'flex',
	columnGap: '1rem',
	padding: '.5rem',
	border: `1px solid ${theme.colors.grey900}`,
	borderBottomLeftRadius: theme.space.borderRad,
	borderBottomLRightRadius: theme.space.borderRad,
	'&:not(:last-child)': {
		borderBottom: 'none',
	},
});

type Props = {
	posts: RedditPostData[];
};

const RedditSection = ({ posts }: Props) => {
	const postComponents = useMemo(() => {
		const components: React.ReactNode[] = [];

		// only use 3 posts
		for (let i = 0; i < 3; i++) {
			const { author, title, permalink, thumbnail, created_utc } = posts[i];

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
					<PostContent>
						<PostTitle href={`https://reddit.com${permalink}`} target='_blank'>
							{title}
						</PostTitle>
						<PostAuthor>{`By ${author}`}</PostAuthor>
						<PostTime title={timeFormatted}>{`${timeAgo} ago`}</PostTime>
					</PostContent>
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
