import { NextApiRequest, NextApiResponse } from 'next';
import { YOUTUBE_CHANNEL_ID } from 'src/common/constants/socialMedia';

import extractStringEnvVar from '@utils/extractStringEnvVar';

const checkLivestreamStatus = async (req: NextApiRequest, res: NextApiResponse) => {
	res.send({ status: 200, live: true });
	res.end();
	return;

	const endpoint = 'https://youtube.googleapis.com/youtube/v3/';
	const apiKey = extractStringEnvVar('YOUTUBE_DATA_API_KEY');

	const reqUrl = `${endpoint}search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&eventType=live&key=${apiKey}`;

	const response: YoutubeResponse = await fetch(reqUrl)
		.then((res) => res.json())
		.catch((reason) => console.log(reason));

	if (response.error) {
		console.error(response.error);
		res.send({ status: 200, live: false });
		res.end();
		return;
	}

	const { items } = response;

	if (items.length) {
		console.log(items);
		res.send({ status: 200, live: true });
		res.end();
	} else {
		res.send({ status: 200, live: false });
		res.end();
	}
};

export default checkLivestreamStatus;
