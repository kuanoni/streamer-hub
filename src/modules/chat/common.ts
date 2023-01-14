import { Role, SubscriptionTier } from '@globalTypes/user';

export enum SocketRooms {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
}

export enum SocketEvents {
	JOIN = 'join',
	LEAVE = 'leave',
	CLIENT_SEND_MSG = 'CLIENT_SEND_MSG',
	CLIENT_RECEIVE_MSG = 'CLIENT_RECEIVE_MSG',
	CLIENT_SEND_COMMAND = 'CLIENT_SEND_COMMAND',
}

export enum ChatPopups {
	NONE,
	OPTIONS,
	USERS,
	EMOTES,
}

export enum EmbedColors {
	default,
	info,
	success,
	error,
}

export type DispatchAction = { type: string; payload?: any };
export type MessageList = (UserMessage | EmbedMessage)[];
export type UsersListItem = {
	username: string;
	subTier?: SubscriptionTier;
	role?: Role;
};
export type UsersList = UsersListItem[];
