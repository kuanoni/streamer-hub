import { createContext, Dispatch, SetStateAction } from 'react';

export interface ChatOptions {
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
	setChatOptions: Dispatch<SetStateAction<ChatOptions>>;
}

const ChatOptionsContext = createContext<ChatOptionsIface | null>(null);

export default ChatOptionsContext;
