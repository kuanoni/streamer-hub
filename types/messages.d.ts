type EmbedMessage = {
	data: Embed;
	time: string;
};

type UserMessage = {
	author: string;
	flair: UsernameFlair;
	data: string | (string | ReactNode)[];
	time: string;
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
	timestamp?: string;
}

interface Embed {
	author?: string;
	title?: string;
	description?: string;
	fields?: Field[];
	footer?: Footer;
}
