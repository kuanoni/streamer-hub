import { SocketServerHandler } from '@/modules/chat/server/SocketServerHandler';
import { NextApiRequest } from 'next';
import { NextApiResponseWithSocket } from 'types/socketio';

export default (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	res = SocketServerHandler(res);
	res.end();
};
