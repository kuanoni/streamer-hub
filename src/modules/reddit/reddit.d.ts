interface RedditPostData {
	author: string;
	title: string;
	permalink: string;
	thumbnail: string;
	created_utc: number;
	num_comments: number;
	score: number;
}

interface RedditPost {
	kind: string;
	data: RedditPostData;
}

interface RedditResponse {
	kind: string;
	data: {
		children: RedditPost[];
	};
}
