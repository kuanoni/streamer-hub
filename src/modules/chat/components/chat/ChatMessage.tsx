import { styled } from 'stiches.config';
import React from 'react';
import { Message } from 'types/socketio';
import { MessageType } from '@/modules/chat/common';
import { injectEmotes } from '../../utils/injectEmotes';
import { injectLinks } from '../../utils/injectLinks';

interface Props {
	msg: Message;
	setFocusedUser: Function;
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
	fontSize: 13,
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
		},
	},
});

const StyledAuthor = styled('span', {
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
	lineHeight: 1.75,
});

const ChatMessage = React.memo(({ msg, setFocusedUser }: Props) => {
	const dateObj = new Date(msg.time);
	const timeTitle = timeTitleFormatter.format(dateObj);
	const timeValue = timeValueFormatter.format(dateObj);

	let newText = injectEmotes(msg.text);
	newText = injectLinks(newText);

	if (msg.type === MessageType.SERVER)
		return (
			<StyledMessage type={MessageType.SERVER}>
				<StyledText>{msg.text}</StyledText>
			</StyledMessage>
		);
	else if (msg.type === MessageType.INFO)
		return (
			<StyledMessage type={MessageType.INFO}>
				<StyledText>{msg.text}</StyledText>
			</StyledMessage>
		);
	else if (msg.type === MessageType.PRIVATE) return <></>;
	else if (msg.type === MessageType.PUBLIC)
		return (
			<StyledMessage className='msg' data-author={msg.author}>
				<time title={timeTitle}>{timeValue}</time>
				<StyledAuthor>
					<span className='author' onClick={() => setFocusedUser(msg.author)}>
						{msg.author}
					</span>
				</StyledAuthor>
				<span className='separator'>{': '}</span>
				<StyledText>{newText}</StyledText>
			</StyledMessage>
		);
	else return <></>;
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
