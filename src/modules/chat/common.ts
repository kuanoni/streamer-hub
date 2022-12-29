export enum SocketRooms {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
}

export enum SocketEvents {
	CLIENT_SEND_MSG = 'CLIENT_SEND_MSG',
	CLIENT_RECEIVE_MSG = 'CLIENT_RECEIVE_MSG',
	CLIENT_SEND_COMMAND = 'CLIENT_SEND_COMMAND',
}

export enum EmbedColors {
	primary,
	blue,
	green,
}

export type DispatchAction = { type: string; payload?: any };
export type MessageList = (UserMessage | EmbedMessage)[];
