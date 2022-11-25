import React, { FC } from 'react';
import { Message } from 'types/socketio';

interface Props {
	msg: Message;
}

const ChatMessage: FC<Props> = ({ msg }) => {
	return <div>{msg.time + ' | ' + msg.displayName + ' | ' + msg.message}</div>;
};

export default ChatMessage;
