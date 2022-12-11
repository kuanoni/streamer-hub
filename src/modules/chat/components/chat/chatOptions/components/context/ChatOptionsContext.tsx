import { createContext, Dispatch, SetStateAction } from 'react';

export interface ChatOptions {
	[index: string]: string | boolean;

	showFlair: boolean;
	showTime: boolean;
	hideNsfw: boolean;
	hideNsfl: boolean;
	censorBadWords: boolean;
	bannedMessages: 'show' | 'censor' | 'remove';
	closeShortPeriod: boolean;
	whisperNotification: boolean;
	whisperInlineMessages: boolean;
	highlightMentioned: boolean;
	mentionsWhenFocused: boolean;
	visibleTaggedUsers: boolean;
}

export interface ChatOptionsIface {
	chatOptions: ChatOptions;
	changeOption(key: string, value: string | boolean): void;
}

const ChatOptionsContext = createContext<ChatOptionsIface | null>(null);

export default ChatOptionsContext;
