export enum UserFlair {
	DEFAULT = '',
	TIER_1_SUB = 't1',
	TIER_2_SUB = 't2',
	TIER_3_SUB = 't3',
	BUDDY = 'buddy',
	OWNER = 'owner',
}

export enum SocketRooms {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
}

export enum SocketEvents {
	CLIENT_SEND_MSG = 'CLIENT_SEND_MSG',
	CLIENT_RECEIVE_MSG = 'CLIENT_RECEIVE_MSG',
	CLIENT_SEND_COMMAND = 'CLIENT_SEND_COMMAND',
}
