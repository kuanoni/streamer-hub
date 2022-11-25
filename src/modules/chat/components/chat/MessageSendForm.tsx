import React, { useContext, useState } from 'react';
import SocketContext from '../context/SocketContext';

const MessageSendForm = () => {
	const socket = useContext(SocketContext);
	const [text, setText] = useState('');

	const sendMessage = () => {
		socket?.sendMessage(text);
		setText('');
	};

	return (
		<div>
			<input type='text' value={text} onChange={(e) => setText(e.target.value)} />
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default MessageSendForm;
