import React, { useContext, useRef } from 'react';
import { styled } from 'stiches.config';
import { IoIosSend } from 'react-icons/io';
import { RiEmotionFill } from 'react-icons/ri';
import SocketContext from '../context/SocketContext';
import EmoteSelector from './EmotePicker';
import { MessageType } from '../../common';
import { useSession } from 'next-auth/react';
import { MessageWithoutTime } from 'types/socketio';

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

const TopContainer = styled('div', {
	position: 'relative',
	height: 0,
	margin: '0 .5rem',
});

const MessageSendForm = ({ isEmotesOpen, setIsEmotesOpen }: { isEmotesOpen: boolean; setIsEmotesOpen: Function }) => {
	const ctx = useContext(SocketContext);
	const { data } = useSession();
	const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

	const sendMessage = () => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		if (!ctx) return console.log('context undefined');
		if (!data?.user) return console.log('user undefined');

		const msg: MessageWithoutTime = {
			type: MessageType.PUBLIC,
			author: data.user.displayName,
			text: textAreaRef.current.value,
		};
		ctx.sendMessage(msg);

		// recalculate textare height
		textAreaRef.current.value = '';
		textAreaRef.current.style.height = 'inherit';
		textAreaRef.current.focus();
		setIsEmotesOpen(false);
	};

	const toggleEmotePicker = () => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		textAreaRef.current.focus();

		setIsEmotesOpen((isOpen: boolean) => {
			return !isOpen;
		});
	};

	const emotePicked = (emoteKey: string) => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		const cursorStart = textAreaRef.current.selectionStart;
		textAreaRef.current.value =
			textAreaRef.current.value.slice(0, cursorStart) +
			emoteKey +
			' ' +
			textAreaRef.current.value.slice(cursorStart);

		textAreaRef.current.selectionEnd = cursorStart + emoteKey.length + 1;

		textAreaRef.current.focus();
	};

	const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.target.value = e.target.value.replace(/[\r\n]+/gm, ' ');
		e.target.style.height = 'inherit';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			e.preventDefault();
			if (textAreaRef.current?.value) sendMessage();
		}
	};

	return (
		<>
			<TopContainer>{isEmotesOpen && <EmoteSelector emotePicked={emotePicked} />}</TopContainer>
			<StyledContainer>
				<StyledTextArea
					ref={textAreaRef}
					onChange={onChangeTextArea}
					onKeyDown={handleOnKeyDown}
					maxLength={500}
					spellCheck={false}
				/>
				<ButtonsContainer>
					<IoIosSend className='btn send-btn' onClick={sendMessage} />
					<RiEmotionFill className='btn emote-btn' onClick={toggleEmotePicker} />
				</ButtonsContainer>
			</StyledContainer>
		</>
	);
};

export default MessageSendForm;
