import React, { FC } from 'react';
import { Message } from 'types/socketio';

interface Props {
	msg: Message;
}

const ChatMessage: FC<Props> = ({ msg }) => {
	const date = new Date(msg.time).toLocaleString('en', { timeZoneName: 'short' });
	return <div>{date + ' | ' + msg.author + ': ' + msg.message}</div>;
};

export default ChatMessage;
