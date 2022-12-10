import React, { useEffect, useState } from 'react';
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

	useEffect(() => {
		const options = { ...initialState };

		Object.keys(options).forEach((key) => {
			const value = localStorage.getItem(key) || options[key];

			// localStorage stores its values as strings
			// boolean values must be converted from strings
			if (typeof options[key] === 'boolean') options[key] = value === 'true';
			else options[key] = value;
		});

		setChatOptions(options);
	}, []);

	const changeOption = (key: string, value: string | boolean) => {
		setChatOptions((currentOptions) => ({ ...currentOptions, ...{ [key]: value } }));
		localStorage.setItem(key, value.toString());
	};

	const providerValue: ChatOptionsIface = {
		chatOptions,
		changeOption,
	};

	return <ChatOptionsContext.Provider value={providerValue}>{children}</ChatOptionsContext.Provider>;
};

export default ChatOptionsProvider;
