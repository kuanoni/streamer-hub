import React from 'react';
import { BsInfoCircleFill, BsShieldFillExclamation } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { ClientOnlyMessage } from '@globalTypes/socketio';
import { MessageType } from '@modules/chat/common';

import ChatMessageText from './ChatMessageText';

const Container = styled('div', {
	fontSize: 13,
	lineHeight: 1.75,
	padding: '.2em 1.2em .2em .6em',
	time: {
		display: 'inline-block',
		color: theme.colors.textMedium,
		fontSize: '.75em',
		marginRight: 4,
	},
	'.separator': {
		display: 'inline',
	},
	variants: {
		type: {
			[MessageType.SERVER]: {
				color: '#ff6d6d',
				fontWeight: 700,
			},
			[MessageType.INFO]: {
				color: '#45d3ff',
			},
		},
	},
});

const AuthorContainer = styled('span', {});

const messageIcon: { [index: number]: React.ReactNode } = {
	[MessageType.SERVER]: <BsShieldFillExclamation />,
	[MessageType.INFO]: <BsInfoCircleFill />,
};

interface Props {
	msg: ClientOnlyMessage;
	setFocusedUser: (user: string) => void;
	censorBadWords: boolean;
}

const ChatClientMessage = React.memo(({ msg }: Props) => {
	return (
		<Container type={msg.type}>
			<AuthorContainer>{messageIcon[msg.type]}</AuthorContainer>
			<span className='separator'>&nbsp;</span>
			<ChatMessageText text={msg.text} />
		</Container>
	);
});

ChatClientMessage.displayName = 'ChatMessage';

export default ChatClientMessage;
