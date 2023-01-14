import { format, formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import Image from 'next/image';
import { BiComment, BiUpvote } from 'react-icons/bi';
import { BsReddit } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import selfPostThumbnail from '@images/self_post_thumbnail.png';

const PostThumbnail = styled(Image, {
	objectFit: 'contain',
	objectPosition: 'top',
});

const PostTitle = styled('span', {
	marginBottom: '1rem',
	marginRight: 'auto',
	paddingRight: '2rem',
	color: theme.colors.textLight,
	'&:hover': {
		textDecoration: 'underline',
	},
});

const PostAuthor = styled('div', {
	color: theme.colors.textMedium,
	fontSize: '0.8em',
});

const PostMetrics = styled('span', {
	display: 'flex',
	alignItems: 'center',
	gap: '1em',
	svg: {
		fontSize: '1.25em',
	},
});

const PostTime = styled('time', {
	display: 'flex',
	alignItems: 'center',
	marginLeft: 'auto',
});

const PostContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
});

const PostFooter = styled('footer', {
	display: 'flex',
	gap: '1rem',
	marginTop: 'auto',
	color: theme.colors.textMedium,
	fontSize: '0.8em',
});

const Post = styled('a', {
	position: 'relative',
	display: 'flex',
	columnGap: '1rem',
	padding: '.75rem 1rem',
	border: `1px solid ${theme.colors.grey700}`,
	borderTop: 'none',
	transition: '.2s ease',
	'&:hover': {
		backgroundColor: theme.colors.grey800,
		textDecoration: 'none',
		cursor: 'pointer',
	},
	'&:first-child': {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	'&:last-child': {
		borderBottom: 'none',
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
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
	const thumbnailUrl =
		thumbnail === 'self' ? selfPostThumbnail : thumbnail === 'default' ? selfPostThumbnail : thumbnail;

	const timeFromUnix = fromUnixTime(created_utc);
	const timeAgo = formatDistanceToNowStrict(timeFromUnix);
	const timeFormatted = format(timeFromUnix, 'yyy-MM-dd, HH:mm:ss');

	return (
		<Post key={permalink} href={`https://reddit.com${permalink}`} target='_blank'>
			<PostThumbnail src={thumbnailUrl} alt='' width={64} height={64} />
			<PostContent>
				<RedditIcon>
					<BsReddit />
				</RedditIcon>
				<PostAuthor>/u/{author}</PostAuthor>
				<PostTitle>{title}</PostTitle>
				<PostFooter>
					<PostMetrics>
						<BiUpvote style={{ marginBottom: '.1em' }} />
						<span>{score}</span>
					</PostMetrics>
					<PostMetrics>
						<BiComment />
						<span>{num_comments}</span>
					</PostMetrics>
					<PostTime title={timeFormatted}>{`${timeAgo} ago`}</PostTime>
				</PostFooter>
			</PostContent>
		</Post>
	);
};

export default RedditPost;
