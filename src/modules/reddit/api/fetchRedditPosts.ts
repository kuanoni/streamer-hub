const fetchRedditPosts = async (subreddit: string) => {
	const limit = 10;
	const res: RedditResponse = await (await fetch(`https://reddit.com/r/${subreddit}/hot.json?limit=${limit}`)).json();

	const posts = res.data.children.map((post) => {
		const { author, title, permalink, thumbnail, created_utc, num_comments, score }: RedditPostData = post.data;
		return { author, title, permalink, thumbnail, created_utc, num_comments, score };
	});

	return posts;
};

export default fetchRedditPosts;
