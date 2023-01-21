import extractStringEnvVar from '../../../common/utils/extractStringEnvVar';

const fetchYoutubeVideos = async (channelId: string, broadcastsOnly: boolean = false) => {
	const endpoint = 'https://youtube.googleapis.com/youtube/v3/';
	const maxResults = 7;
	const apiKey = extractStringEnvVar('YOUTUBE_DATA_API_KEY');

	const reqUrl = `${endpoint}search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&safeSearch=none&type=video&${
		broadcastsOnly ? 'eventType=completed&' : ''
	}key=${apiKey}`;

	const response: YoutubeResponse = await fetch(reqUrl)
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

		return {
			videoId,
			title: decode(title),
			description: decode(description),
			publishedAt,
			liveBroadcastContent,
			thumbnails,
		};
	});

	return videos;
};

export default fetchYoutubeVideos;
