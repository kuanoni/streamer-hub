import { NextApiResponse } from 'next';
import { User } from 'next-auth';
import { Server as IOServer, Socket } from 'socket.io';

import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

declare module 'socket.io' {
	interface Socket {
		user: User;
	}
}

interface SocketServer extends HTTPServer {
	io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO;
}
