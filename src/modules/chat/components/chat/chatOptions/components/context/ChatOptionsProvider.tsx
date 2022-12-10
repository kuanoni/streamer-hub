import React, { useState } from 'react';
import ChatOptionsContext, { ChatOptions, ChatOptionsIface } from './ChatOptionsContext';

type Props = {
	children: React.ReactNode;
};

const initialState: ChatOptions = {
	showFlair: false,
	showTime: true,
	hideNsfw: true,
	hideNsfl: true,
	censorBadWords: false,
	bannedMessages: 'censor',
	closeShortPeriod: false,
	whisperNotification: false,
	whisperInlineMessages: false,
	highlightMentioned: false,
	mentionsWhenFocused: false,
	visibleTaggedUsers: false,
};

const ChatOptionsProvider = ({ children }: Props) => {
	const [chatOptions, setChatOptions] = useState<ChatOptions>(initialState);

	const providerValue: ChatOptionsIface = {
		chatOptions,
		setChatOptions,
	};

	return <ChatOptionsContext.Provider value={providerValue}>{children}</ChatOptionsContext.Provider>;
};

export default ChatOptionsProvider;
