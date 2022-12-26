import { Rank } from '@globalTypes/custom-auth';

export enum MessageFlair {
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

export const FlairColors: { [index: string]: { color: string } } = {
	[MessageFlair.DEFAULT]: {
		color: 'var(--colors-textLight)',
	},
	[MessageFlair.TIER_1_SUB]: {
		color: 'rgb(72, 185, 190)',
	},
	[MessageFlair.TIER_2_SUB]: {
		color: 'rgb(72, 185, 240)',
	},
	[MessageFlair.TIER_3_SUB]: {
		color: 'rgb(20, 185, 255)',
	},
	[MessageFlair.BUDDY]: {
		color: 'rgb(240, 151, 72)',
	},
	[MessageFlair.OWNER]: {
		color: 'rgb(225, 53, 53)',
	},
};
