import { Rank } from '@globalTypes/custom-auth';

export enum MessageType {
	DEFAULT,
	SERVER,
	INFO,
}

export enum MessageScope {
	PUBLIC,
	CLIENT,
	PRIVATE,
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

export const RankColors = {
	[Rank.DEFAULT]: {
		color: 'var(--colors-textLight)',
	},
	[Rank.TIER_1]: {
		color: 'rgb(72, 185, 190)',
	},
	[Rank.TIER_2]: {
		color: 'rgb(72, 185, 240)',
	},
	[Rank.TIER_3]: {
		color: 'rgb(20, 185, 255)',
	},
	[Rank.ORBITER]: {
		color: 'rgb(240, 151, 72)',
	},
	[Rank.OWNER]: {
		color: 'rgb(225, 53, 53)',
	},
};
