import React, { useContext, useMemo, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { styled, theme } from 'stiches.config';

import { MessageBoxContainer } from '@modules/chat/styles';

import EmbedMessage from './chatMessages/EmbedMessage';
import UserMessage from './chatMessages/TextMessage';
import SocketContext from './context/SocketContext';
import ChatOptionsContext from './optionsMenu/components/context/ChatOptionsContext';

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
	paddingBottom: '.25rem',
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
		opacity: 0,
		visibility: 'hidden',
		pointerEvents: 'none',
	},
});

interface Props {
	closePopup: () => void;
	hide: boolean;
}

const ChatMessageList = ({ closePopup, hide }: Props) => {
	const scrollableContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const bottomRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [focusedUser, setFocusedUser] = useState('');
	const [freeScroll, setFreeScroll] = useState(false);

	const socketCtx = useContext(SocketContext);
	const optionsCtx = useContext(ChatOptionsContext);

	const showFlair = optionsCtx?.chatOptions.showFlair === true;
	const showTime = optionsCtx?.chatOptions.showTime === true;
	const hideNsfw = optionsCtx?.chatOptions.hideNsfw === true;
	const hideNsfl = optionsCtx?.chatOptions.hideNsfl === true;

	// uses css selector to target focusedUser messages
	const focusedUserCssSelector = '.msg[data-author="' + focusedUser.toString() + '"]';

	// uses selector to highlight focusedUser messages and dim the rest
	const containerCss = useMemo(() => {
		let cssObj = {};

		if (hide)
			cssObj = {
				...cssObj,
				visibility: 'hidden',
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

	// control how messages are rendered through css selectors rather than re-rendering components
	const messagesContainerCss = useMemo(() => {
		let cssObj = {};

		if (!showFlair)
			cssObj = {
				...cssObj,
				'.author img': {
					display: 'none',
				},
			};

		if (!showTime)
			cssObj = {
				...cssObj,
				time: {
					display: 'none',
				},
			};

		if (hideNsfw)
			cssObj = {
				...cssObj,
				'& .nsfw': {
					fontSize: 0,
				},
				'& .nsfw::before': {
					content: '<NSFW>',
					fontSize: '13px',
					backgroundColor: theme.colors.grey800,
				},
				'& .nsfw:hover::before': {
					backgroundColor: theme.colors.grey700,
					cursor: 'pointer',
				},
			};

		if (hideNsfl)
			cssObj = {
				...cssObj,
				'& .nsfl': {
					fontSize: 0,
				},
				'& .nsfl::before': {
					content: '<NSFL>',
					fontSize: '13px',
					backgroundColor: theme.colors.grey800,
				},
				'& .nsfl:hover::before': {
					backgroundColor: theme.colors.grey700,
					cursor: 'pointer',
				},
			};

		return cssObj;
	}, [freeScroll, showFlair, showTime, hideNsfw, hideNsfl]);

	const shouldReRenderLiveMessages = freeScroll ? null : socketCtx?.messageList;

	// live rendered messages
	const liveMessages = useMemo(() => {
		const censorBadWords = optionsCtx?.chatOptions.censorBadWords === true;

		return (
			<>
				{socketCtx?.messageList.map((msg) => {
					if ('author' in msg)
						return (
							<UserMessage
								key={msg.time + msg.author}
								msg={msg}
								setFocusedUser={setFocusedUser}
								censorBadWords={censorBadWords}
							/>
						);
					else return <EmbedMessage key={msg.time} embed={msg.data} time={msg.time} />;
				})}
			</>
		);
	}, [shouldReRenderLiveMessages, optionsCtx?.chatOptions.censorBadWords]);

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