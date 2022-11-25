import React, { useContext, useState } from 'react';
import { styled } from 'stiches.config';
import SocketContext from '../context/SocketContext';

const StyledContainer = styled('div', {
	display: 'flex',
	width: '100%',
	height: 60,
	padding: 6,
	textarea: {
		width: '100%',
		color: '$text',
		backgroundColor: '$bgDarker',
		border: '1px solid $bgDark',
		outline: 'none',
		resize: 'none',
	},
	button: {
		border: 'none',
		borderLeft: '1px solid $bgDark',
		borderRadius: 0,
		color: '$text',
		backgroundColor: '$bg',
		cursor: 'pointer',
	},
	'button:hover': {
		backgroundColor: '$bgDarker',
	},
});

const MessageSendForm = () => {
	const socket = useContext(SocketContext);
	const [text, setText] = useState('');

	const sendMessage = () => {
		socket?.sendMessage(text);
		setText('');
	};

	const handleOnKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code === 'Enter') {
			sendMessage();
		}
	};

	return (
		<StyledContainer>
			<textarea value={text} onChange={(e) => setText(e.target.value)} onKeyUp={handleOnKeyUp} maxLength={500} />
			<button onClick={sendMessage}>Send</button>
		</StyledContainer>
	);
};

export default MessageSendForm;
