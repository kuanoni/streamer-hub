import React, { useContext, useState } from 'react';
import { styled } from 'stiches.config';
import { IoIosSend } from 'react-icons/io';
import SocketContext from '../context/SocketContext';

const StyledContainer = styled('div', {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	height: 75,
	margin: 6,
	backgroundColor: '$bgDarker',
	border: '1px solid $bgDark',

	textarea: {
		width: '100%',
		height: '100%',
		marginRight: 0,
		padding: 6,
		color: '$text',
		backgroundColor: '$bgDarker',
		border: 'none',
		outline: 'none',
		resize: 'none',
	},
	'.send-btn': {
		width: '2rem',
		height: '2rem',
		marginRight: 6,
		padding: 6,
		border: 'none',
		borderRadius: '50%',
		color: '$text',
		backgroundColor: '$bgDark',
		cursor: 'pointer',
	},
	'.send-btn:hover': {
		backgroundColor: '$bg',
		color: '#fff',
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
			<IoIosSend className='send-btn' onClick={sendMessage} />
		</StyledContainer>
	);
};

export default MessageSendForm;
