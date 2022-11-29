import { styled } from 'stiches.config';
import React, { useContext, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';
import { MessageBoxContainer } from '../../styles';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Message } from 'types/socketio';

const StyledContainer = styled('div', {
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

const ChatMessages = ({ closePopup }: { closePopup: Function }) => {
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
	}, [focusedUser, focusedUserSelector]);

	const chatMessageList = useMemo(() => {
		return socket?.messageLogs.map((msg: Message) => {
			if (!msg.time) msg.time = new Date().toISOString();
			const time = typeof msg.time === 'string' ? msg.time : msg.time.toISOString();
			return <ChatMessage key={time + msg.author} msg={msg} setFocusedUser={setFocusedUser} />;
		});
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
		closePopup();
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
			<BottomContainer>
				<ScrollDownButton onClick={scrollToBottom} className={freeScroll ? '' : 'hide'}>
					<RiArrowDownSLine />
				</ScrollDownButton>
			</BottomContainer>
		</>
	);
};

export default ChatMessages;
