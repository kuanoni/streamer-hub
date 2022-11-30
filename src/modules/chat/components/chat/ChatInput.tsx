import React, { useContext, useRef } from 'react';
import { styled } from 'stiches.config';
import { IoIosSend } from 'react-icons/io';
import { RiEmotionFill } from 'react-icons/ri';
import SocketContext from '../context/SocketContext';
import EmoteSelector from './ChatEmoteList';
import { MessageType } from '../../common';
import { useSession } from 'next-auth/react';
import { MessageWithoutTime } from 'types/socketio';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	height: 'auto',
	margin: '.5rem',
	padding: '.4rem',
	backgroundColor: '$bgDarker',
	border: '1px solid $bgDark',
});

const TextArea = styled('textarea', {
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

const ChatInput = ({ isEmotesOpen, setIsEmotesOpen }: { isEmotesOpen: boolean; setIsEmotesOpen: Function }) => {
	const ctx = useContext(SocketContext);
	const { data } = useSession();
	const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

	const sendMessage = () => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		if (!ctx) return console.log('context undefined');
		if (!data?.user) return console.log('user undefined');

		// send message through socket connection
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

	// open and close EmoteList
	const toggleEmoteList = () => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		textAreaRef.current.focus();

		setIsEmotesOpen((isOpen: boolean) => {
			return !isOpen;
		});
	};

	// when button in ChatEmoteList is clicked
	const insertEmote = (emoteKey: string) => {
		if (!textAreaRef.current) return console.log('textarea undefined');
		const cursorStart = textAreaRef.current.selectionStart;

		// insert emote text at current cursor position
		textAreaRef.current.value =
			textAreaRef.current.value.slice(0, cursorStart) +
			emoteKey +
			' ' +
			textAreaRef.current.value.slice(cursorStart);

		// update cursor position to the end of inserted text
		textAreaRef.current.selectionEnd = cursorStart + emoteKey.length + 1;

		textAreaRef.current.focus();
	};

	const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// remove line breaks
		e.target.value = e.target.value.replace(/[\r\n]+/gm, ' ');

		// updates textarea height to fit its text content
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
			<TopContainer>{isEmotesOpen && <EmoteSelector insertEmote={insertEmote} />}</TopContainer>
			<Container>
				<TextArea
					ref={textAreaRef}
					onChange={onChangeTextArea}
					onKeyDown={handleOnKeyDown}
					maxLength={500}
					spellCheck={false}
				/>
				<ButtonsContainer>
					<IoIosSend className='btn send-btn' onClick={sendMessage} />
					<RiEmotionFill className='btn emote-btn' onClick={toggleEmoteList} />
				</ButtonsContainer>
			</Container>
		</>
	);
};

export default ChatInput;
