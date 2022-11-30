import { styled } from 'stiches.config';
import React, { useContext, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';
import { MessageBoxContainer } from '../../styles';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Message } from 'types/socketio';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column-reverse',
	height: '100%',
	overflowY: 'auto',
	scrollbarWidth: 'thin',

	'.messagesContainer': {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
});

const BottomContainer = styled('div', {
	position: 'relative',
	height: 0,
	margin: '0 .5rem',
});

const ScrollDownButton = styled(MessageBoxContainer, {
	display: 'flex',
	justifyContent: 'center',
	backgroundColor: '$bgLightest',
	opacity: 0.9,
	transition: '.2s ease',
	svg: {
		width: '2rem',
		height: '2rem',
	},
	'&:hover': {
		color: '$text',
		opacity: 1,
		cursor: 'pointer',
	},
	'&.hide': {
		opacity: 0,
		pointerEvents: 'none',
	},
});

const ChatMessageList = ({ closePopup }: { closePopup: Function }) => {
	const ctx = useContext(SocketContext);
	const scrollableContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const bottomRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [focusedUser, setFocusedUser] = useState('');
	const [freeScroll, setFreeScroll] = useState(false);

	// uses css selector to target focusedUser messages
	const focusedUserCssSelector = '.msg[data-author=' + focusedUser + ']';

	// uses selector to highlight focusedUser messages and dim the rest
	const containerCss = useMemo(() => {
		if (focusedUser)
			return {
				[focusedUserCssSelector]: {
					opacity: '1 !important',
				},
				'.msg': {
					opacity: 0.3,
				},
			};
		else return {};
	}, [focusedUser, focusedUserCssSelector]);

	// rendered messages
	const chatMessageList = useMemo(() => {
		return ctx?.messageLogs.map((msg: Message) => {
			return <ChatMessage key={msg.time + msg.author} msg={msg} setFocusedUser={setFocusedUser} />;
		});
	}, [ctx?.messageLogs]);

	// scrolls to bottom of chat
	const scrollToBottom = () => {
		if (!bottomRef.current) return;
		bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	// user scrolling turns on freeScroll, reaching the bottom turns it off
	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (!scrollableContainerRef.current) return;

		const isScrolledToBottom = scrollableContainerRef.current?.scrollTop === 0;
		if (isScrolledToBottom) setFreeScroll(false);
		else setFreeScroll(true);
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (focusedUser) setFocusedUser('');
		closePopup();
	};

	return (
		<>
			<Container ref={scrollableContainerRef} onScroll={handleScroll} onClick={handleClick} css={containerCss}>
				{/* since container has a flex direction of column-reverse, bottomRef needs to be above mesage list */}
				<div ref={bottomRef}></div>
				<div className='messagesContainer'>{chatMessageList}</div>
			</Container>
			<BottomContainer>
				<ScrollDownButton onClick={scrollToBottom} className={freeScroll ? '' : 'hide'}>
					<RiArrowDownSLine />
				</ScrollDownButton>
			</BottomContainer>
		</>
	);
};

export default ChatMessageList;
