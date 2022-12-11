import { NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer, Socket } from 'socket.io';
import { MessageType } from '@/modules/chat/common';
import { Rank } from './custom-auth';

interface SocketServer extends HTTPServer {
	io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO;
}

type MessageWithoutTime = {
	type: MessageType;
	author: string;
	rank: Rank;
	text: string;
};

type Message = MessageWithoutTime & {
	time: string;
};
