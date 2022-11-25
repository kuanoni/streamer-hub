import { styled } from 'stiches.config';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';

const StyledContainer = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column-reverse',
	justifyItems: 'end',
	overflowY: 'auto',
	height: '100%',
});

const ScrollToBottomContainer = styled('div', {
	position: 'sticky',
	bottom: 6,
	height: 0,
	left: 6,
	right: 6,
	margin: 10,
	button: {
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
	const [focusedUser, setFocusedUser] = useState('');
	const [freeScroll, setFreeScroll] = useState(false);

	const focusedUserSelector = 'div[data-username=' + focusedUser + ']';

	const containerFocusedUserCss = useMemo(() => {
		if (focusedUser)
			return {
				[focusedUserSelector]: {
					opacity: '1 !important',
				},
				div: {
					opacity: 0.3,
				},
			};
		else return {};
	}, [focusedUser]);

	const chatMessageList = useMemo(() => {
		return socket?.messageLogs
			.map((msg) => <ChatMessage key={msg.time + msg.author} msg={msg} setFocusedUser={setFocusedUser} />)
			.reverse();
	}, [socket?.messageLogs]);

	const scrollToBottom = () => {
		scrollableContainerRef.current?.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (scrollableContainerRef.current?.scrollTop === 0) setFreeScroll(false);
		else setFreeScroll(true);
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (focusedUser) setFocusedUser('');
	};

	return (
		<StyledContainer
			ref={scrollableContainerRef}
			onScroll={handleScroll}
			onClick={handleClick}
			css={containerFocusedUserCss}
		>
			<ScrollToBottomContainer>
				<button onClick={scrollToBottom} className={freeScroll ? '' : 'hide'}>
					Scroll to bottom
				</button>
			</ScrollToBottomContainer>
			{chatMessageList}
		</StyledContainer>
	);
};

export default ChatMessages;
