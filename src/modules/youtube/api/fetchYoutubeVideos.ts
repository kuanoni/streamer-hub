import { decode } from 'he';
import { inspect } from 'util';

import extractStringEnvVar from '../../../common/utils/extractStringEnvVar';

const videosAndBroadcasts: YoutubeVideoData[] = [
	{
		videoId: 'Amb_mOXq1KM',
		title: 'Kainoa Araiza Web Dev Stream',
		description: '',
		publishedAt: '2023-01-22T20:40:45Z',
		liveBroadcastContent: 'live',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'guiSdd8Av5E',
		title: 'Kainoa Araiza Web Dev Stream',
		description: '',
		publishedAt: '2023-01-22T19:42:22Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'ocvSRI7AisQ',
		title: 'horny jail',
		description: '',
		publishedAt: '2020-11-01T07:32:38Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/ocvSRI7AisQ/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/ocvSRI7AisQ/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/ocvSRI7AisQ/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'hYQ9ituz4Tw',
		title: 'lost in space',
		description: '',
		publishedAt: '2020-10-28T00:05:30Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/hYQ9ituz4Tw/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/hYQ9ituz4Tw/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/hYQ9ituz4Tw/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: '-AZ-cUobMl4',
		title: "you aren't welcome to cheeseman's party",
		description: 'please leave.',
		publishedAt: '2020-10-18T03:16:02Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/-AZ-cUobMl4/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/-AZ-cUobMl4/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/-AZ-cUobMl4/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: '5QnMbkT-Uuw',
		title: 'cat walk 2',
		description: '',
		publishedAt: '2020-10-16T04:29:56Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/5QnMbkT-Uuw/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/5QnMbkT-Uuw/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/5QnMbkT-Uuw/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: '6muYOLsKkVI',
		title: 'cat walk',
		description: '',
		publishedAt: '2020-10-11T14:15:42Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/6muYOLsKkVI/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/6muYOLsKkVI/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/6muYOLsKkVI/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'mYOq8X7shfY',
		title: 'small man-cat tells us a sad story',
		description: '',
		publishedAt: '2020-10-10T23:03:29Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/mYOq8X7shfY/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/mYOq8X7shfY/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/mYOq8X7shfY/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'Dgv2UhjYnHI',
		title: 'le necromancer',
		description: 'its really him.',
		publishedAt: '2020-10-10T02:13:13Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/Dgv2UhjYnHI/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/Dgv2UhjYnHI/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/Dgv2UhjYnHI/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'xqrwpXBQwuk',
		title: 'making minecraft',
		description: '',
		publishedAt: '2019-02-11T01:21:18Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/xqrwpXBQwuk/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/xqrwpXBQwuk/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/xqrwpXBQwuk/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
];

const pastBroadcasts: YoutubeVideoData[] = [
	{
		videoId: 'Amb_mOXq1KM',
		title: 'Kainoa Araiza Web Dev Stream',
		description: '',
		publishedAt: '2023-01-22T20:40:45Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/Amb_mOXq1KM/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
	{
		videoId: 'guiSdd8Av5E',
		title: 'Kainoa Araiza Web Dev Stream',
		description: '',
		publishedAt: '2023-01-22T19:42:22Z',
		liveBroadcastContent: 'none',
		thumbnails: {
			default: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/default.jpg',
				width: 120,
				height: 90,
			},
			medium: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/mqdefault.jpg',
				width: 320,
				height: 180,
			},
			high: {
				url: 'https://i.ytimg.com/vi/guiSdd8Av5E/hqdefault.jpg',
				width: 480,
				height: 360,
			},
		},
	},
];

const fetchYoutubeVideos = async (channelId: string, broadcastsOnly: boolean = false) => {
	// for debugging purposes, so that I don't use my entire Google API quotas

	if (process.env.NODE_ENV === 'development') {
		if (broadcastsOnly) return pastBroadcasts;
		else return videosAndBroadcasts;
	}

	const endpoint = 'https://youtube.googleapis.com/youtube/v3/';
	const maxResults = 25;
	const apiKey = extractStringEnvVar('YOUTUBE_DATA_API_KEY');

	console.log(apiKey);

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

	// console.log(inspect(videos, false, null, true /* enable colors */));

	return videos;
};

export default fetchYoutubeVideos;
