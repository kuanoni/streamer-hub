import React, {
	Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState
} from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { styled, theme } from 'stiches.config';

import { MessageType } from '@globalTypes/user';
import { CustomScrollbar, MessageBoxContainer } from '@modules/chat/styles';
import { CSS } from '@stitches/react';

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
	...CustomScrollbar,
	variants: {
		hide: {
			true: {
				visibility: 'hidden',
			},
			false: {
				visibility: 'visible',
			},
		},
	},
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

const UnpauseButton = styled(MessageBoxContainer, {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '.25rem',
	backgroundColor: theme.colors.primary400,
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
	focusedUser: string;
	setFocusedUser: Dispatch<SetStateAction<string>>;
	closePopup: () => void;
	hide: boolean;
}

const ChatMessageList = ({ focusedUser, setFocusedUser, closePopup, hide }: Props) => {
	const scrollableContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const bottomRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [isPaused, setIsPaused] = useState(false);
	const [messages, setMessages] = useState<(UserMessage | EmbedMessage)[]>([]);

	const socketCtx = useContext(SocketContext);
	const optionsCtx = useContext(ChatOptionsContext);

	const showBadges = optionsCtx?.chatOptions.showBadges === true;
	const showTime = optionsCtx?.chatOptions.showTime === true;
	const hideNsfw = optionsCtx?.chatOptions.hideNsfw === true;
	const hideNsfl = optionsCtx?.chatOptions.hideNsfl === true;

	const liveMessageList = socketCtx?.messageList;

	// uses css selector to target focusedUser messages
	const focusedUserCssSelector = `.msg[data-author="${focusedUser.toString()}"]`;

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
	}, [focusedUser, focusedUserCssSelector]);

	// control how messages are rendered through css selectors rather than re-rendering components
	const messagesContainerCss = useMemo(() => {
		const cssObj: CSS = {};

		if (!showBadges)
			cssObj['.author img'] = {
				display: 'none',
			};

		if (!showTime)
			cssObj.time = {
				display: 'none',
			};

		if (hideNsfw) {
			cssObj['& .nsfw'] = { fontSize: 0 };
			cssObj['& .nsfw::before'] = {
				content: '<NSFW>',
				fontSize: '13px',
				backgroundColor: theme.colors.grey700,
			};
			cssObj['& .nsfw:hover::before'] = {
				backgroundColor: theme.colors.grey600,
				cursor: 'pointer',
			};
		}

		if (hideNsfl) {
			cssObj['& .nsfl'] = { fontSize: 0 };
			cssObj['& .nsfl::before'] = {
				content: '<NSFL>',
				fontSize: '13px',
				backgroundColor: theme.colors.grey700,
			};
			cssObj['& .nsfl:hover::before'] = {
				backgroundColor: theme.colors.grey600,
				cursor: 'pointer',
			};
		}

		return cssObj;
	}, [isPaused, showBadges, showTime, hideNsfw, hideNsfl]);

	// update messages only when not paused
	useEffect(() => {
		if (!isPaused && liveMessageList) setMessages(liveMessageList);
	}, [setMessages, liveMessageList, isPaused]);

	// uses bottomRef to scroll to bottom of chat
	const scrollToBottom = () => {
		if (!bottomRef.current) return;
		bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	// user scrolling turns on freeScroll, reaching the bottom turns it off
	const handleScroll = () => {
		if (!scrollableContainerRef.current) return;

		const isScrolledToBottom = scrollableContainerRef.current?.scrollTop === 0;
		setIsPaused(!isScrolledToBottom);
	};

	const handleClick = () => {
		if (focusedUser) setFocusedUser('');
		closePopup();
	};

	return (
		<>
			<Container
				ref={scrollableContainerRef}
				onScroll={handleScroll}
				onClick={handleClick}
				hide={hide}
				css={containerCss}
			>
				{/* since container has a flex direction of column-reverse, bottomRef needs to be at the top */}
				<div ref={bottomRef}></div>
				<MessagesContainer css={messagesContainerCss}>
					{messages.map((msg) => {
						if (msg.type === MessageType.TEXT)
							return <UserMessage key={msg.id} msg={msg} setFocusedUser={setFocusedUser} />;
						if (msg.type === MessageType.EMBED)
							return <EmbedMessage key={msg.id} embedData={msg.data} time={msg.time} />;
					})}
				</MessagesContainer>
			</Container>
			<BottomContainer>
				<UnpauseButton onClick={scrollToBottom} className={hide ? 'really-hide' : isPaused ? '' : 'hide'}>
					<RiArrowDownSLine />
					UNPAUSE
					<RiArrowDownSLine />
				</UnpauseButton>
			</BottomContainer>
		</>
	);
};

export default ChatMessageList;
