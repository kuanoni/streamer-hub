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

export const UsernameColors: { [index: string]: { color: string } } = {
	[UserFlair.DEFAULT]: {
		color: 'var(--colors-textLight)',
	},
	[UserFlair.TIER_1_SUB]: {
		color: 'rgb(72, 185, 190)',
	},
	[UserFlair.TIER_2_SUB]: {
		color: 'rgb(72, 185, 240)',
	},
	[UserFlair.TIER_3_SUB]: {
		color: 'rgb(20, 185, 255)',
	},
	[UserFlair.BUDDY]: {
		color: 'rgb(240, 151, 72)',
	},
	[UserFlair.OWNER]: {
		color: 'rgb(225, 53, 53)',
	},
};
