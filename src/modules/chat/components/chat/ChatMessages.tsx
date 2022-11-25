import { styled } from 'stiches.config';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';

const StyledContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column-reverse',
	justifyItems: 'end',
	overflowY: 'auto',
	height: '100%',
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

	// if (scrollableContainerRef.current)
	// 	scrollableContainerRef.current?.scrollTo({
	// 		top: scrollableContainerRef.current.scrollHeight,
	// 		behavior: 'auto',
	// 	});

	// useEffect(() => {
	// 	scrollableContainerRef.current?.scrollTo({
	// 		top: scrollableContainerRef.current.scrollHeight,
	// 		behavior: 'auto',
	// 	});
	// }, [scrollableContainerRef.current?.scrollHeight]);

	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		console.log(e);
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
			{chatMessageList}
		</StyledContainer>
	);
};

export default ChatMessages;
