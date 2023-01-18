interface YoutubeThumbnail {
	width: number;
	height: number;
	url: string;
}

type YoutubeThumbnailKeys = 'default' | 'medium' | 'high' | 'standard' | 'maxres';

type YoutubeThumbnails = {
	[key in YoutubeThumbnailKeys]: YoutubeThumbnail | undefined;
};

interface YoutubeVideoSnippet {
	title: string;
	description: string;
	liveBroadcastContent: 'none' | 'live' | 'upcoming';
	publishedAt: string;
	thumbnails: YoutubeThumbnails;
}

interface YoutubeVideoItem {
	kind: string;
	etag: string;
	id: { kind: string; videoId: string };
	snippet: YoutubeVideoSnippet;
}

interface YoutubeError {
	domain: string;
	location: string;
	locationType: string;
	message: string;
	reason: string;
}

interface YoutubeFetchError {
	code: number;
	message: string;
	errors: YoutubeError[];
}

interface YoutubeErrorResponse {
	error: YoutubeFetchError;
}

interface YoutubeSuccessResponse {
	kind: string;
	etag: string;
	regionCode: string;
	items: YoutubeVideoItem[];
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	error: undefined;
}

type YoutubeResponse = YoutubeSuccessResponse | YoutubeErrorResponse;

interface YoutubeVideoData extends YoutubeVideoSnippet {
	videoId: string;
}
