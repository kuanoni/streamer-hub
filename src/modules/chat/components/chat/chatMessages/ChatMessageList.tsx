import { styled, theme } from 'stiches.config';
import React, { useContext, useMemo, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Message } from 'types/socketio';
import { MessageBoxContainer } from '@/modules/chat/styles';
import SocketContext from '../../context/SocketContext';
import ChatOptionsContext from '../chatOptions/components/context/ChatOptionsContext';

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column-reverse',
	height: '100%',
	overflowY: 'scroll',
	scrollbarWidth: 'thin',
	scrollbarColor: `${theme.colors.primary900} ${theme.colors.grey900}`,
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
		opacity: 0,
		zIndex: 1,
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
	alignItems: 'center',
	padding: '.25rem',
	backgroundColor: theme.colors.primary900,
	fontWeight: 700,
	opacity: 0.9,
	transition: 'opacity .2s ease',
	svg: {
		width: '1.5rem',
		height: '1.5rem',
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
	'&.really-hide': {
		visibility: 'hidden',
		pointerEvents: 'none',
	},
});

interface Props {
	closePopup: () => void;
	hide: boolean;
}

const ChatMessageList = ({ closePopup, hide }: Props) => {
	const socketCtx = useContext(SocketContext);
	const optionsCtx = useContext(ChatOptionsContext);
	const scrollableContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const bottomRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [focusedUser, setFocusedUser] = useState('');
	const [freeScroll, setFreeScroll] = useState(false);

	// uses css selector to target focusedUser messages
	const focusedUserCssSelector = '.msg[data-author="' + focusedUser.toString() + '"]';

	// uses selector to highlight focusedUser messages and dim the rest
	const containerCss = useMemo(() => {
		let cssObj = {};

		if (hide)
			cssObj = {
				...cssObj,
				visibility: 'hidden',
				[`${ScrollDownButton}`]: {
					visibility: 'hidden',
				},
			};

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
	}, [hide, focusedUser, focusedUserCssSelector]);

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

	const shouldRenderLiveMessages = freeScroll ? null : socketCtx?.messageLogs;

	// live rendered messages
	const liveMessages = useMemo(() => {
		const showFlair = optionsCtx?.chatOptions.showFlair === true;
		const showTime = optionsCtx?.chatOptions.showTime === true;
		const hideNsfw = optionsCtx?.chatOptions.hideNsfw === true;
		const hideNsfl = optionsCtx?.chatOptions.hideNsfl === true;
		const censorBadWords = optionsCtx?.chatOptions.censorBadWords === true;

		return socketCtx?.messageLogs.map((msg: Message) => (
			<ChatMessage
				key={msg.time + msg.author}
				showFlair={showFlair}
				showTime={showTime}
				hideNsfw={hideNsfw}
				hideNsfl={hideNsfl}
				censorBadWords={censorBadWords}
				msg={msg}
				setFocusedUser={setFocusedUser}
			/>
		));
	}, [
		shouldRenderLiveMessages,
		optionsCtx?.chatOptions.showTime,
		optionsCtx?.chatOptions.showFlair,
		optionsCtx?.chatOptions.hideNsfw,
		optionsCtx?.chatOptions.hideNsfl,
		optionsCtx?.chatOptions.censorBadWords,
	]);

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
				{/* since container has a flex direction of column-reverse, bottomRef needs to be at the top */}
				<div ref={bottomRef}></div>
				<MessagesContainer css={messagesContainerCss}>
					{freeScroll ? pausedMessages : liveMessages}
				</MessagesContainer>
			</Container>
			<BottomContainer>
				<ScrollDownButton onClick={scrollToBottom} className={hide ? 'really-hide' : freeScroll ? '' : 'hide'}>
					<RiArrowDownSLine />
					UNPAUSE
					<RiArrowDownSLine />
				</ScrollDownButton>
			</BottomContainer>
		</>
	);
};

export default ChatMessageList;
