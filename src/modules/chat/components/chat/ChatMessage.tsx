import { styled } from '../../../../../stiches.config';
import React, { FC } from 'react';
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
	variants: {
		isFocused: {
			true: {
				opacity: '1 !important',
			},
		},
		isFocusing: {
			true: {
				opacity: 0.3,
			},
			false: {
				opacity: 1,
			},
		},
	},
	time: {
		display: 'none',
		color: '$textDark',
		fontSize: '.75em',
		marginRight: 4,
	},
	'.separator::after': {
		content: ' ',
	},
});

const StyledAuthor = styled('span', {
	button: {
		padding: 0,
		margin: 0,
		border: 'none',
		color: 'inherit',
		background: 'none',
		fontSize: 'inherit',
	},
	'button:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
});

const StyledText = styled('span', {});

const ChatMessage: FC<Props> = ({ msg, setFocusedUser }) => {
	const dateObj = new Date(msg.time);
	const timeTitle = timeTitleFormatter.format(dateObj);
	const timeValue = timeValueFormatter.format(dateObj);

	return (
		<StyledMessage data-username={msg.author}>
			<time title={timeTitle}>{timeValue}</time>
			<StyledAuthor>
				<button onClick={() => setFocusedUser(msg.author)}>{msg.author}</button>
			</StyledAuthor>
			<span className='separator'>:</span>
			<StyledText>{msg.text}</StyledText>
		</StyledMessage>
	);
};

export default ChatMessage;
