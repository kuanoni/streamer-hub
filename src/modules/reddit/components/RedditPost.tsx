import { format, formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import Image from 'next/image';
import { BiComment, BiUpvote } from 'react-icons/bi';
import { BsReddit } from 'react-icons/bs';
import { styled } from 'stiches.config';

import selfPostThumbnail from '@images/self_post_thumbnail.png';

const lightText = 'rgb(231, 233, 234)';
const darkText = 'rgb(113, 118, 123)';
const borderColor = 'rgb(51, 54, 57)';

const PostThumbnail = styled(Image, {
	objectFit: 'contain',
	objectPosition: 'top',
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

const PostAuthor = styled('div', {
	color: darkText,
	fontSize: 13,
});

const SvgWrapper = styled('div', {
	position: 'relative',
	width: 18.75,
	height: 18.75,
	svg: {
		color: 'inherit',
		width: '100%',
		height: '100%',
		transition: 'color .1s',
	},
	'&::after': {
		content: '',
		position: 'absolute',
		top: '-8px',
		left: '-8px',
		width: 'calc(100% + 16px)',
		height: 'calc(100% + 16px)',
		padding: 8,
		borderRadius: '50%',
		opacity: 0,
		transition: 'opacity .1s',
	},
});

const PostMetrics = styled('span', {
	display: 'flex',
	height: 20,
	span: {
		display: 'inline',
		padding: '0 8px',
		marginTop: 2,
		transition: 'color .1s',
	},
	[`&:hover ${SvgWrapper}::after`]: {
		opacity: 1,
	},
	variants: {
		color: {
			blue: {
				'&:hover': {
					color: 'rgb(20, 158, 240)',
				},
				[`${SvgWrapper}::after`]: {
					backgroundColor: 'rgb(20, 158, 240, 0.1)',
				},
			},
			orange: {
				'&:hover': {
					color: 'rgb(255, 139, 90)',
				},
				[`${SvgWrapper}::after`]: {
					backgroundColor: 'rgb(255, 139, 90, 0.1)',
				},
			},
		},
	},
});

const PostTime = styled('time', {
	display: 'flex',
	marginTop: 2,
	marginLeft: 'auto',
});

const PostContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
});

const PostFooter = styled('footer', {
	display: 'flex',
	gap: '.5rem',
	marginTop: 'auto',
	color: darkText,
	fontSize: 13,
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
					<PostMetrics color='orange'>
						<SvgWrapper>
							<BiUpvote style={{ marginTop: 0 }} />
						</SvgWrapper>
						<span>{score}</span>
					</PostMetrics>
					<PostMetrics color='blue'>
						<SvgWrapper>
							<BiComment style={{ marginLeft: 1, marginTop: 1 }} />
						</SvgWrapper>
						<span>{num_comments}</span>
					</PostMetrics>
					<PostTime title={timeFormatted}>{`${timeAgo} ago`}</PostTime>
				</PostFooter>
			</PostContent>
		</Post>
	);
};

export default RedditPost;
