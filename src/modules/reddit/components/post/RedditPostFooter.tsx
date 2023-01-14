import { format, formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { BiComment, BiUpvote } from 'react-icons/bi';
import { styled } from 'stiches.config';

import { darkText } from '@modules/reddit/common';

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

const PostFooter = styled('footer', {
	display: 'flex',
	gap: '.5rem',
	marginTop: 'auto',
	color: darkText,
	fontSize: 13,
});

type Props = Pick<RedditPostData, 'created_utc' | 'num_comments' | 'score'>;

const RedditPostFooter = ({ created_utc, num_comments, score }: Props) => {
	const timeFromUnix = fromUnixTime(created_utc);
	const timeAgo = formatDistanceToNowStrict(timeFromUnix);
	const timeFormatted = format(timeFromUnix, 'yyy-MM-dd, HH:mm:ss');

	return (
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
	);
};

export default RedditPostFooter;
