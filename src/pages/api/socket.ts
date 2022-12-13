import { NextApiRequest } from 'next';

import { NextApiResponseWithSocket } from '@globalTypes/socketio';
import { SocketServerHandler } from '@modules/chat/server/SocketServerHandler';

const socket = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	res = SocketServerHandler(res);
	res.end();
};

export default socket;
