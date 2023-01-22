import { SUBREDDIT_NAME } from 'src/common/constants/socialMedia';

const fetchRedditPosts = async () => {
	const limit = 10;
	const res: RedditResponse = await (
		await fetch(`https://api.reddit.com/r/${SUBREDDIT_NAME}/hot.json?limit=${limit}`)
	).json();

	const posts: RedditPostData[] = res.data.children.map((post) => {
		const { author, title, permalink, thumbnail, created_utc, num_comments, score }: RedditPostData = post.data;
		return { author, title, permalink, thumbnail, created_utc, num_comments, score };
	});

	return posts;
};

export default fetchRedditPosts;
