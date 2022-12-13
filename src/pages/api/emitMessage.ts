import { SocketEvents } from '@modules/chat/common';
import extractStringEnvVar from '@utils/extractStringEnvVar';
import { NextApiRequest } from 'next';
import { NextApiResponseWithSocket } from '@types/socketio';

const emitMessage = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) return res.send({ status: 500, message: 'Socket server not running' });

	let body;
	if (typeof req.body === 'object') body = req.body;
	else if (typeof req.body === 'string') body = JSON.parse(req.body);
	else return res.end({ status: 500, message: 'Request body is neither object or string' });

	if (!body.secret) return res.send({ status: 500, message: 'Must include secret key' });
	if (!body.author) return res.send({ status: 500, message: 'Must include author' });
	if (!body.text) return res.send({ status: 500, message: 'Must include text' });

	if (body.secret !== extractStringEnvVar('CUSTOM_API_SECRET'))
		return res.send({ status: 500, message: 'Invalid secret key' });

	const newMessage = { ...body, time: new Date() };

	res.socket.server.io.emit(SocketEvents.CLIENT_RECEIVE_MSG, newMessage);

	res.send({ status: 200 });
	res.end();
};

export default emitMessage;
