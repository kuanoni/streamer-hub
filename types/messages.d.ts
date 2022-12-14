type Message = {
	id: string;
	time: number;
};

type EmbedMessage = Message & {
	type: import('./user').MessageType.EMBED;
	data: EmbedData;
};

type UserMessage = Message & {
	type: import('./user').MessageType.TEXT;
	author: string;

	subTier?: import('./user').SubscriptionTier;
	infoBadges?: import('./user').InfoBadge[];
	role?: import('./user').Role;

	data: string | (string | import('react').ReactNode)[];
};

type UserMessageToServer = {
	data: string;
};

type CommandMessage = {
	name: string;
	params: string;
};

interface Field {
	title?: string;
	description?: string;
}

interface Footer {
	title?: string;
}

interface EmbedData {
	author?: string;
	title?: string;
	description?: string;
	fields?: Field[];
	footer?: Footer;
	color?: import('@modules/chat/common').EmbedColors;
}
