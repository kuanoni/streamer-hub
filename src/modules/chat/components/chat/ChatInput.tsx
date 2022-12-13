import { BsCursorFill, BsEmojiSmileFill } from 'react-icons/bs';
import React, { useContext, useRef } from 'react';
import { styled, theme } from 'stiches.config';

import EmoteSelector from './ChatEmoteList';
import IconButton from '@components/new/IconButton';
import { MessageType } from '../../common';
import { MessageWithoutTime } from '@globalTypes/socketio';
import SocketContext from '../context/SocketContext';
import { useSession } from 'next-auth/react';

const Container = styled('div', {
	padding: '.5rem 0',
	height: 'auto',
});

const TextAreaWrapper = styled('div', {
	display: 'flex',
	height: 'auto',
	padding: '.5rem',
	border: `1px solid ${theme.colors.grey900}`,
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
	scrollbarWidth: 'thin',
});

const ButtonsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '.35rem',
});

const TopContainer = styled('div', {
	position: 'relative',
	height: 0,
	margin: '0 .5rem',
});

const ChatInput = ({
	isEmotesOpen,
	setIsEmotesOpen,
	setIsSigninPromptOpen,
}: {
	isEmotesOpen: boolean;
	setIsEmotesOpen: Function;
	setIsSigninPromptOpen: Function;
}) => {
	const ctx = useContext(SocketContext);
	const { data, status } = useSession();
	const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

	const sendMessage = () => {
		if (!textAreaRef.current) throw new Error('textarea undefined');
		if (!ctx) throw new Error('context undefined');
		if (!data?.user) throw new Error('user undefined');

		// send message through socket connection
		const msg: MessageWithoutTime = {
			type: MessageType.PUBLIC,
			author: data.user.displayName,
			rank: data.user.rank,
			text: textAreaRef.current.value,
		};
		ctx.sendMessage(msg);

		// recalculate textare height
		textAreaRef.current.value = '';
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.focus();
		setIsEmotesOpen(false);
	};

	// open and close EmoteList
	const toggleEmoteList = () => {
		if (!textAreaRef.current) throw new Error('textarea undefined');
		if (status !== 'authenticated') return setIsSigninPromptOpen(true);

		textAreaRef.current.focus();

		setIsEmotesOpen((isOpen: boolean) => {
			return !isOpen;
		});
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

	const onFocusTextArea = () => {
		if (status === 'unauthenticated') {
			textAreaRef.current?.blur();
			setIsSigninPromptOpen(true);
		}
	};

	const onKeyDownTextArea = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			e.preventDefault();
			if (textAreaRef.current?.value) sendMessage();
		}
	};

	return (
		<>
			<TopContainer>{isEmotesOpen && <EmoteSelector insertEmote={insertEmote} />}</TopContainer>
			<Container>
				<TextAreaWrapper>
					<TextArea
						ref={textAreaRef}
						onChange={onChangeTextArea}
						onFocus={onFocusTextArea}
						onKeyDown={onKeyDownTextArea}
						maxLength={500}
						spellCheck={false}
					/>
					<ButtonsContainer>
						<IconButton
							size={36}
							onClick={() => {
								if (textAreaRef.current?.value) sendMessage();
							}}
						>
							<BsCursorFill />
						</IconButton>
						<IconButton size={36} onClick={toggleEmoteList}>
							<BsEmojiSmileFill />
						</IconButton>
					</ButtonsContainer>
				</TextAreaWrapper>
			</Container>
		</>
	);
};

export default ChatInput;
