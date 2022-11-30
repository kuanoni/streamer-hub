import { styled } from 'stiches.config';
import React from 'react';
import { Message } from 'types/socketio';
import { MessageType } from '@/modules/chat/common';
import { injectEmotes } from '../../utils/injectEmotes';
import { injectLinks } from '../../utils/injectLinks';
import { BsShieldFillExclamation, BsInfoCircleFill } from 'react-icons/bs';

interface Props {
	msg: Message;
	setFocusedUser: (user: string) => void;
}

const timeTitleFormatter = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
});

const timeValueFormatter = new Intl.DateTimeFormat('default', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
});

const StyledMessage = styled('div', {
	display: 'flex',
	fontSize: 13,
	lineHeight: 1.75,
	padding: '.2em 1.2em .2em .6em',
	time: {
		display: 'none',
		color: '$textDark',
		fontSize: '.75em',
		marginRight: 4,
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
			[MessageType.PRIVATE]: {},
		},
	},
});

const StyledAuthor = styled('span', {
	display: 'flex',
	alignItems: 'center',
	'.author': {
		height: '100%',
		padding: 0,
		paddingLeft: 3,
		margin: 0,
		border: 'none',
		color: 'inherit',
		background: 'none',
		fontSize: 'inherit',
		fontWeight: 900,
	},
	'.author:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
});

const StyledText = styled('span', {
	maxWidth: '100%',
	wordWrap: 'break-word',
});

type MessageIconObject = {
	[index: number]: React.ReactNode;
};

const messageIcon: MessageIconObject = {
	[MessageType.SERVER]: <BsShieldFillExclamation />,
	[MessageType.INFO]: <BsInfoCircleFill />,
};

const ChatMessage = React.memo(({ msg, setFocusedUser }: Props) => {
	let newText = injectEmotes(msg.text);
	newText = injectLinks(newText);

	if (msg.type === MessageType.PUBLIC) {
		const dateObj = new Date(msg.time);
		const timeTitle = timeTitleFormatter.format(dateObj);
		const timeValue = timeValueFormatter.format(dateObj);

		return (
			<StyledMessage className='msg' data-author={msg.author}>
				<time title={timeTitle}>{timeValue}</time>
				<StyledAuthor>
					<span className='author' onClick={() => setFocusedUser(msg.author)}>
						{msg.author}
					</span>
				</StyledAuthor>
				<span className='separator'>:&nbsp;</span>
				<StyledText>{newText}</StyledText>
			</StyledMessage>
		);
	} else
		return (
			<StyledMessage type={msg.type}>
				<StyledAuthor>{messageIcon[msg.type]}</StyledAuthor>
				<span className='separator'>&nbsp;</span>
				<StyledText>{msg.text}</StyledText>
			</StyledMessage>
		);
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
