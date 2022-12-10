import { styled, theme } from 'stiches.config';
import React, { useContext, useMemo, useRef, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';
import { MessageBoxContainer } from '../../styles';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Message } from 'types/socketio';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column-reverse',
	height: '100%',
	background: 'linear-gradient(180deg, rgba(63, 88, 148, 0.03) 0%, rgba(63, 88, 148, 0) 100%)',
	overflowY: 'auto',
	scrollbarWidth: 'thin',
	scrollbarColor: `${theme.colors.primary300} ${theme.colors.cover}`,
});

const MessagesContainer = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',

	'&::after': {
		content: '',
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 1,
		opacity: 0,
		boxShadow: 'rgba(51, 51, 51, 0.81) inset 0px 0px 5px 4px',
		transition: 'opacity .2s ease-out',
		pointerEvents: 'none',
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
	backgroundColor: theme.colors.action,
	opacity: 0.9,
	transition: '.2s ease',
	svg: {
		width: '2rem',
		height: '2rem',
	},
	'&:hover': {
		color: theme.colors.textLight,
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
		let cssObj = {};

		if (focusedUser)
			cssObj = {
				...cssObj,
				[focusedUserCssSelector]: {
					opacity: '1 !important',
				},
				'.msg': {
					opacity: 0.3,
				},
			};

		return cssObj;
	}, [focusedUser, focusedUserCssSelector]);

	const messagesContainerCss = useMemo(() => {
		let cssObj = {};
		if (freeScroll)
			cssObj = {
				...cssObj,
				'&::after': {
					opacity: 1,
				},
			};

		return cssObj;
	}, [freeScroll]);

	// live rendered messages
	const liveMessages = useMemo(() => {
		return ctx?.messageLogs.map((msg: Message) => {
			return <ChatMessage key={msg.time + msg.author} msg={msg} setFocusedUser={setFocusedUser} />;
		});
	}, [freeScroll ? null : ctx?.messageLogs]);

	// paused rendered messages
	const pausedMessages = useMemo(() => {
		if (freeScroll) return liveMessages;
		else return [];
	}, [freeScroll]);

	// scrolls to bottom of chat
	const scrollToBottom = () => {
		if (!bottomRef.current) return;
		bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	// user scrolling turns on freeScroll, reaching the bottom turns it off
	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (!scrollableContainerRef.current) return;

		const isScrolledToBottom = scrollableContainerRef.current?.scrollTop === 0;
		setFreeScroll(!isScrolledToBottom);
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
				<MessagesContainer css={messagesContainerCss}>
					{freeScroll ? pausedMessages : liveMessages}
				</MessagesContainer>
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
