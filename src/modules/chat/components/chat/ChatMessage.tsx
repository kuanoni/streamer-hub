import { styled } from 'stiches.config';
import React from 'react';
import { Message } from 'types/socketio';

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
});

const ChatMessage = React.memo(({ msg, setFocusedUser }: Props) => {
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
			<span className='separator'>{': '}</span>
			<StyledText>{msg.text}</StyledText>
		</StyledMessage>
	);
});

export default ChatMessage;
