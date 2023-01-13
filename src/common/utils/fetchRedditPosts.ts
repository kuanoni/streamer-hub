const fetchRedditPosts = async () => {
	const res: RedditResponse = await (await fetch('https://reddit.com/r/destiny/hot.json?limit=10')).json();

	const posts = res.data.children.map((post) => {
		const { author, title, permalink, thumbnail, created_utc, num_comments, score }: RedditPostData = post.data;
		return { author, title, permalink, thumbnail, created_utc, num_comments, score };
	});

	return posts;
};

export default fetchRedditPosts;
