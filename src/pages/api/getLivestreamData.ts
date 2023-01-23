import { NextApiRequest, NextApiResponse } from 'next';
import { YOUTUBE_CHANNEL_ID } from 'src/common/constants/socialMedia';

const getVideoId = async () => {
	const videoId = await fetch(`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`)
		.then((response) => response.text())
		.then((resp) => {
			let n = resp.search(/\{"videoId[\sA-Za-z0-9:"\{\}\]\[,\-_]+BADGE_STYLE_TYPE_LIVE_NOW/i);

			//If found
			if (n >= 0) {
				let videoId = resp.slice(n + 1, resp.indexOf('}', n) - 1).split('":"')[1];
				return videoId;
			}

			//If not found, then try another method to find live video
			n = resp.search(/https:\/\/i.ytimg.com\/vi\/[A-Za-z0-9\-_]+\/hqdefault_live.jpg/i);
			if (n >= 0) {
				let videoId = resp.slice(n, resp.indexOf('.jpg', n) - 1).split('/')[4];
				return videoId;
			}

			return null;
		})
		.catch(function (err) {
			console.error('Something went wrong', err);
		});

	return videoId || undefined;
};

const getLivestreamData = async (req: NextApiRequest, res: NextApiResponse) => {
	const videoId = await getVideoId();
	const responseData: LivestreamData = { live: !!videoId, videoId };

	res.send(responseData);
	res.end();
};

export default getLivestreamData;
