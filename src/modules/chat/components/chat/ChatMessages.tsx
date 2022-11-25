import { styled } from 'stiches.config';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';

const StyledContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column-reverse',
	height: '100%',
	overflowY: 'auto',

	'.messagesContainer': {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
});

const ToBottomButton = styled('div', {
	position: 'relative',
	height: 0,
	margin: '0 10px',
	button: {
		position: 'absolute',
		width: '100%',
		padding: '6px 0',
		color: '$textDark',
		backgroundColor: '$bgDark',
		border: 'none',
		opacity: 0.8,
		transform: 'translateY(-100%)',
		transition: '.2s ease',
	},
	'button:hover': {
		color: '$text',
		opacity: 1,
		cursor: 'pointer',
	},
	'button.hide': {
		opacity: 0,
		pointerEvents: 'none',
	},
});

const ChatMessages = () => {
	const socket = useContext(SocketContext);
	const scrollableContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const bottomRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [focusedUser, setFocusedUser] = useState('');
	const [freeScroll, setFreeScroll] = useState(false);

	// uses css selector to highlight focusedUser messages while dimming the rest
	const focusedUserSelector = '.msg[data-author=' + focusedUser + ']';
	const containerFocusedUserCss = useMemo(() => {
		if (focusedUser)
			return {
				[focusedUserSelector]: {
					opacity: '1 !important',
				},
				'.msg': {
					opacity: 0.3,
				},
			};
		else return {};
	}, [focusedUser]);

	const chatMessageList = useMemo(() => {
		return socket?.messageLogs.map((msg) => (
			<ChatMessage key={msg.time + msg.author} msg={msg} setFocusedUser={setFocusedUser} />
		));
	}, [socket?.messageLogs]);

	const scrollToBottom = () => {
		if (!bottomRef.current) return;
		bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	// scrolling turns on freeScroll, reaching the bottom turns it off
	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (!scrollableContainerRef.current) return;
		const scrolledToBottom = scrollableContainerRef.current?.scrollTop === 0;

		if (scrolledToBottom) setFreeScroll(false);
		else setFreeScroll(true);
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (focusedUser) setFocusedUser('');
	};

	return (
		<>
			<StyledContainer
				ref={scrollableContainerRef}
				onScroll={handleScroll}
				onClick={handleClick}
				css={containerFocusedUserCss}
			>
				<div ref={bottomRef}></div>
				<div className='messagesContainer'>{chatMessageList}</div>
			</StyledContainer>

			<ToBottomButton>
				<button onClick={scrollToBottom} className={freeScroll ? '' : 'hide'}>
					Scroll to bottom
				</button>
			</ToBottomButton>
		</>
	);
};

export default ChatMessages;
