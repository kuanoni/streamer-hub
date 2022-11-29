import { NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer, Socket } from 'socket.io';
import { MessageType } from '@/modules/chat/common';

interface SocketServer extends HTTPServer {
	io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO;
}

type Message = {
	type: MessageType;
	time?: string;
	author: string;
	text: string;
};
