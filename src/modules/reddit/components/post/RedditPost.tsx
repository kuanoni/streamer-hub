import { decode } from 'he';
import Image from 'next/image';
import { BsReddit } from 'react-icons/bs';
import { styled } from 'stiches.config';

import defaultThumbnail from '@images/reddit_thumbnails/default.png';
import linkThumbnail from '@images/reddit_thumbnails/link.png';
import nsfwThumbnail from '@images/reddit_thumbnails/nsfw.png';
import selfThumbnail from '@images/reddit_thumbnails/self.png';
import { borderColor, darkText, lightText } from '@modules/reddit/common';

import RedditPostFooter from './RedditPostFooter';

const PostThumbnail = styled(Image, {
	objectFit: 'contain',
	objectPosition: 'top',
});

const PostAuthor = styled('div', {
	color: darkText,
	fontSize: 13,
});

const PostTitle = styled('span', {
	marginBottom: '1rem',
	marginRight: 'auto',
	paddingRight: '2rem',
	color: lightText,
	'&:hover': {
		textDecoration: 'underline',
	},
});

const PostContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
});

const Post = styled('a', {
	position: 'relative',
	display: 'flex',
	columnGap: '1rem',
	padding: '.75rem 1rem',
	border: `1px solid ${borderColor}`,
	borderTop: 'none',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgb(22, 24, 28)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

const RedditIcon = styled('div', {
	position: 'absolute',
	top: '.75rem',
	right: '1rem',
	color: 'rgb(255, 135, 0)',
	fontSize: '1.25em',
});

interface Props extends RedditPostData {}

const RedditPost = ({ author, title, permalink, thumbnail, created_utc, num_comments, score }: Props) => {
	// TODO: add thumbnail images for 'self', 'default', and 'nsfw' posts
	const thumbnailUrl = thumbnail.startsWith('http')
		? thumbnail
		: thumbnail === 'self'
		? selfThumbnail
		: thumbnail === 'default'
		? defaultThumbnail
		: thumbnail === 'nsfw'
		? nsfwThumbnail
		: thumbnail === 'link'
		? linkThumbnail
		: defaultThumbnail;

	return (
		<Post key={permalink} href={`https://reddit.com${permalink}`} target='_blank'>
			<PostThumbnail src={thumbnailUrl} alt='' width={64} height={64} />
			<PostContent>
				<RedditIcon>
					<BsReddit />
				</RedditIcon>
				<PostAuthor>/u/{author}</PostAuthor>
				<PostTitle>{decode(title)}</PostTitle>
				<RedditPostFooter created_utc={created_utc} num_comments={num_comments} score={score} />
			</PostContent>
		</Post>
	);
};

export default RedditPost;
