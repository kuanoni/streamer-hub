const fetchRedditPosts = async () => {
	const res: RedditResponse = await (await fetch('https://reddit.com/r/destiny/hot.json')).json();
	const posts = res.data.children.map((post) => {
		const { author, title, permalink, thumbnail, created_utc } = post.data;
		return { author, title, permalink, thumbnail, created_utc };
	});

	return posts;
};

export default fetchRedditPosts;
