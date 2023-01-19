import Image from 'next/image';
import { BsReddit } from 'react-icons/bs';
import { styled } from 'stiches.config';

import selfPostThumbnail from '@images/self_post_thumbnail.png';
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
	const thumbnailUrl = thumbnail.startsWith('http') ? thumbnail : selfPostThumbnail;

	return (
		<Post key={permalink} href={`https://reddit.com${permalink}`} target='_blank'>
			<PostThumbnail src={thumbnailUrl} alt='' width={64} height={64} />
			<PostContent>
				<RedditIcon>
					<BsReddit />
				</RedditIcon>
				<PostAuthor>/u/{author}</PostAuthor>
				<PostTitle>{title}</PostTitle>
				<RedditPostFooter created_utc={created_utc} num_comments={num_comments} score={score} />
			</PostContent>
		</Post>
	);
};

export default RedditPost;
