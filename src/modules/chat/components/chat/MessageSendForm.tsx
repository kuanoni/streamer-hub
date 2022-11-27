import React, { useContext, useRef, useState } from 'react';
import { styled } from 'stiches.config';
import { IoIosSend } from 'react-icons/io';
import { RiEmotionFill } from 'react-icons/ri';
import SocketContext from '../context/SocketContext';

const StyledContainer = styled('div', {
	position: 'relative',
	display: 'flex',
	height: 'auto',
	margin: '.5rem',
	padding: '.4rem',
	backgroundColor: '$bgDarker',
	border: '1px solid $bgDark',
});

const StyledTextArea = styled('textarea', {
	width: '100%',
	height: 'inherit',
	color: '$text',
	backgroundColor: 'transparent',
	border: 'none',
	overflow: 'hidden',
	outline: 'none',
	resize: 'none',
	scrollbarWidth: 'thin',
});

const ButtonsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '.35rem',

	'.btn': {
		minWidth: '1.75rem',
		minHeight: '1.75rem',
		padding: '.4rem',
		border: 'none',
		borderRadius: '6px',
		color: '$text',
		backgroundColor: '$bgDark',
		cursor: 'pointer',
	},
	'.btn:hover': {
		backgroundColor: '$bg',
		color: '#fff',
	},
});

const MessageSendForm = () => {
	const socket = useContext(SocketContext);
	const [text, setText] = useState('');
	const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

	const sendMessage = () => {
		socket?.sendMessage(text);
		setText('');
	};

	const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value.replace(/\s+/g, ' '));
		e.target.style.height = 'inherit';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	const handleOnKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code === 'Enter') {
			sendMessage();
		}
	};

	return (
		<StyledContainer>
			<StyledTextArea
				ref={textAreaRef}
				value={text}
				onChange={onChangeTextArea}
				onKeyUp={handleOnKeyUp}
				maxLength={500}
				spellCheck={false}
			/>
			<ButtonsContainer>
				<IoIosSend className='btn send-btn' onClick={sendMessage} />
				<RiEmotionFill className='btn emote-btn' onClick={sendMessage} />
			</ButtonsContainer>
		</StyledContainer>
	);
};

export default MessageSendForm;
