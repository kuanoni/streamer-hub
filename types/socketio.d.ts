import { NextApiResponse } from 'next';
import { ReactNode } from 'react';
import { Server as IOServer, Socket } from 'socket.io';

import { MessageScope, MessageType } from '@/modules/chat/common';

import { Rank } from './custom-auth';

import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
	io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO;
}

type MessageClientOnly = {
	scope: MessageScope.CLIENT;
	type: MessageType.SERVER | MessageType.INFO;
	time: string;
	text: string | (string | ReactNode)[];
};

type MessageServerToClient = {
	scope: MessageScope.PUBLIC;
	type: MessageType.DEFAULT;
	time: string;
	author: string;
	rank: Rank;
	text: string | (string | ReactNode)[];
};

type MessageClientToServer = {
	author: string;
	rank: Rank;
	text: string;
};

type CommandFromClient = {
	author: string;
	name: string;
	params: string;
};
