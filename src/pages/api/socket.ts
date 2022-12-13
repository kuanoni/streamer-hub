import { SocketServerHandler } from '@modules/chat/server/SocketServerHandler';
import { NextApiRequest } from 'next';
import { NextApiResponseWithSocket } from '@types/socketio';

const socket = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	res = SocketServerHandler(res);
	res.end();
};

export default socket;
