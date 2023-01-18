import extractStringEnvVar from '../../../common/utils/extractStringEnvVar';

const fetchYoutubeVideos = async () => {
	const endpoint = 'https://youtube.googleapis.com/youtube/v3/search';
	const channelId = 'UCM2fsEsL6rW99JYMPFmwgtA';
	const maxResults = 50;
	const apiKey = extractStringEnvVar('YOUTUBE_DATA_API_KEY');

	const response: YoutubeResponse = await fetch(
		`${endpoint}?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&safeSearch=none&type=video&key=${apiKey}`
	)
		.then((res) => res.json())
		.catch((reason) => console.log(reason));

	if (response.error) {
		console.error(response.error);
		return [];
	}

	const { items, pageInfo } = response;

	const videos: YoutubeVideoData[] = items.map((item) => {
		const videoId = item.id.videoId;
		const { title, description, publishedAt, liveBroadcastContent, thumbnails } = item.snippet;

		return { videoId, title, description, publishedAt, liveBroadcastContent, thumbnails };
	});

	return videos;
};

export default fetchYoutubeVideos;
