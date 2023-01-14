import { NextApiRequest } from 'next';
import { v4 } from 'uuid';

import { NextApiResponseWithSocket } from '@globalTypes/socketio';
import { MessageType } from '@globalTypes/user';
import { SocketEvents } from '@modules/chat/common';
import extractStringEnvVar from '@utils/extractStringEnvVar';

const emitMessage = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) return res.send({ status: 500, message: 'Socket server not running' });

	let body;
	if (typeof req.body === 'object') body = req.body;
	else if (typeof req.body === 'string') body = JSON.parse(req.body);
	else return res.end({ status: 500, message: 'Request body is neither object or string' });

	const { secret, author, subTier, infoBadges, role, data } = body;

	if (!secret) return res.send({ status: 500, message: 'Must include secret key' });
	if (!author || typeof author !== 'string') return res.send({ status: 500, message: 'Must include author' });
	if (!data || typeof data !== 'string') return res.send({ status: 500, message: 'Must include data' });

	if (body.secret !== extractStringEnvVar('CUSTOM_API_SECRET'))
		return res.send({ status: 500, message: 'Invalid secret key' });

	const newMessage: UserMessage = { id: v4(), type: MessageType.TEXT, author, data, time: new Date().getTime() };

	if (subTier) newMessage.subTier = subTier;
	if (infoBadges) newMessage.infoBadges = infoBadges;
	if (role) newMessage.role = role;

	res.socket.server.io.emit(SocketEvents.CLIENT_RECEIVE_MSG, newMessage);

	res.send({ status: 200 });
	res.end();
};

export default emitMessage;
