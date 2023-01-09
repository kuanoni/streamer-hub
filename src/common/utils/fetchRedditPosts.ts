const fetchRedditPosts = async () => {
	const res: RedditResponse = await (await fetch('https://reddit.com/r/destiny/hot.json')).json();
	const posts = res.data.children;

	return posts;
};

export default fetchRedditPosts;
