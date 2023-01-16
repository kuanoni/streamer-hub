import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { BsCursorFill, BsEmojiSmileFill } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import IconButton from '@components/ui/IconButton';

import { ChatPopups } from '../common';
import { CustomScrollbar } from '../styles';
import SocketContext from './context/SocketContext';

const Container = styled('div', {
	padding: '.5rem 0',
	height: 'auto',
});

const TextAreaWrapper = styled('div', {
	display: 'flex',
	height: 'auto',
	padding: '.5rem',
	border: `1px solid ${theme.colors.grey700}`,
	borderRadius: theme.space.borderRad,
});

const TextArea = styled('textarea', {
	width: '100%',
	height: 'inherit',
	color: theme.colors.textLight,
	backgroundColor: 'transparent',
	border: 'none',
	overflow: 'hidden',
	outline: 'none',
	resize: 'none',
	...CustomScrollbar,
	'@sm': {
		fontSize: 16,
	},
	'@l_xs': {
		fontSize: 16,
	},
});

const ButtonsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '.35rem',
});

type Props = {
	popupOpen: ChatPopups;
	togglePopup: (popup: ChatPopups) => void;
	closePopup: () => void;
};

const ChatInput = forwardRef(({ popupOpen, togglePopup, closePopup }: Props, ref) => {
	const ctx = useContext(SocketContext);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useImperativeHandle(ref, () => insertEmote, []);

	const submitMessage = () => {
		if (!textAreaRef.current) throw new Error('textarea undefined');
		if (!ctx) throw new Error('context undefined');

		// send message through socket connection
		const msg: UserMessageToServer = {
			data: textAreaRef.current.value,
		};
		ctx.sendMessage(msg);

		// recalculate textare height
		textAreaRef.current.value = '';
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.focus();
		if (popupOpen === ChatPopups.EMOTES) closePopup();
	};

	// open and close EmoteList
	const toggleEmoteList = () => {
		if (!textAreaRef.current) throw new Error('textarea undefined');

		textAreaRef.current.focus();
		togglePopup(ChatPopups.EMOTES);
	};

	// when button in ChatEmoteList is clicked
	const insertEmote = (emoteKey: string) => {
		if (!textAreaRef.current) throw new Error('textarea undefined');
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
		e.target.style.height = e.target.scrollHeight - 1 + 'px';
	};

	// use Enter key to send message
	const onKeyDownTextArea = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			e.preventDefault();
			if (textAreaRef.current?.value) submitMessage();
		}
	};

	return (
		<>
			<Container>
				<TextAreaWrapper>
					<TextArea
						ref={textAreaRef}
						onChange={onChangeTextArea}
						onKeyDown={onKeyDownTextArea}
						maxLength={500}
						spellCheck={false}
					/>
					<ButtonsContainer>
						<IconButton
							color='dark'
							onClick={() => {
								if (textAreaRef.current?.value) submitMessage();
							}}
						>
							<BsCursorFill />
						</IconButton>
						<IconButton color='dark' onClick={toggleEmoteList}>
							<BsEmojiSmileFill />
						</IconButton>
					</ButtonsContainer>
				</TextAreaWrapper>
			</Container>
		</>
	);
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
