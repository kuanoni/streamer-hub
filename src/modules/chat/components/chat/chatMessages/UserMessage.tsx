import React from 'react';
import { styled, theme } from 'stiches.config';

import { UserMessage } from '@globalTypes/socketio';

import UserMessageAuthor from './UserMessageAuthor';
import UserMessageText from './UserMessageText';

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

const Container = styled('div', {
	padding: '.2em 1.2em .2em .6em',
	fontSize: 13,
	lineHeight: 1.5,
	time: {
		display: 'inline-block',
		color: theme.colors.textMedium,
		fontSize: '.75em',
		marginRight: 4,
	},
	'.separator': {
		display: 'inline',
	},
});

interface Props {
	msg: UserMessage;
	setFocusedUser: (user: string) => void;
	censorBadWords: boolean;
}

const UserMessage = React.memo(({ msg, setFocusedUser, censorBadWords }: Props) => {
	const dateObj = new Date(msg.time);
	const timeTitle = timeTitleFormatter.format(dateObj);
	const timeValue = timeValueFormatter.format(dateObj);

	return (
		<Container className='msg' data-author={msg.author}>
			<time title={timeTitle}>{timeValue}</time>
			<UserMessageAuthor flair={msg.flair} onClick={() => setFocusedUser(msg.author)}>
				{msg.author}
			</UserMessageAuthor>
			<UserMessageText text={msg.data} />
		</Container>
	);
});

UserMessage.displayName = 'UserMessage';

export default UserMessage;
