import { styled, theme } from 'stiches.config';
import { Message } from 'types/socketio';
import { MessageType, RankColors } from '@/modules/chat/common';
import { BsShieldFillExclamation, BsInfoCircleFill } from 'react-icons/bs';
import { GiRank1, GiRank2, GiRank3 } from 'react-icons/gi';
import { Rank } from 'types/custom-auth';
import ChatMessageText from './ChatMessageText';
import React from 'react';

const timeTitleFormatter = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
});

const timeValueFormatter = new Intl.DateTimeFormat('default', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
});

const Container = styled('div', {
	fontSize: 13,
	lineHeight: 1.75,
	padding: '.2em 1.2em .2em .6em',
	time: {
		display: 'none',
		color: theme.colors.textMedium,
		fontSize: '.75em',
		marginRight: 4,
	},
	'time.show': {
		display: 'inline-block',
	},
	'.separator': {
		display: 'inline',
	},
	variants: {
		type: {
			[MessageType.SERVER]: {
				color: '#ff6d6d',
				fontWeight: 700,
			},
			[MessageType.INFO]: {
				color: '#45d3ff',
			},
			[MessageType.PRIVATE]: {},
		},
	},
});

const AuthorContainer = styled('span', {});

const Author = styled('span', {
	display: 'inline',
	padding: 0,
	paddingLeft: 3,
	margin: 0,
	border: 'none',
	color: 'inherit',
	background: 'none',
	fontSize: 'inherit',
	fontWeight: 900,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
	svg: {
		verticalAlign: 'middle',
		marginRight: '.25em',
	},

	variants: {
		rank: RankColors,
	},
});

const Text = styled('span', {
	maxWidth: '100%',
	wordWrap: 'break-word',
});

const messageIcon: { [index: number]: React.ReactNode } = {
	[MessageType.SERVER]: <BsShieldFillExclamation />,
	[MessageType.INFO]: <BsInfoCircleFill />,
};

const RankFlair: { [index: string]: React.ReactNode } = {
	[Rank.TIER_1]: <GiRank1 />,
	[Rank.TIER_2]: <GiRank2 />,
	[Rank.TIER_3]: <GiRank3 />,
};

interface Props {
	msg: Message;
	setFocusedUser: (user: string) => void;
	showFlair: boolean;
	showTime: boolean;
	hideNsfw: boolean;
	hideNsfl: boolean;
	censorBadWords: boolean;
}

// try getting options from local storage instead of context
// might have trouble deciding when to re-render though???
// individual options items could set the local storage from inside the component, thus preventing re-rendering of ChatOptions

const ChatMessage = React.memo(
	({ msg, setFocusedUser, showFlair, showTime, hideNsfw, hideNsfl, censorBadWords }: Props) => {
		if (msg.type === MessageType.PUBLIC) {
			const dateObj = new Date(msg.time);
			const timeTitle = timeTitleFormatter.format(dateObj);
			const timeValue = timeValueFormatter.format(dateObj);

			const flair = RankFlair[msg.rank];

			return (
				<Container className='msg' data-author={msg.author}>
					<time className={showTime ? 'show' : ''} title={timeTitle}>
						{timeValue}
					</time>
					<Author rank={msg.rank} onClick={() => setFocusedUser(msg.author)}>
						{showFlair && flair ? flair : null}
						{msg.author}
					</Author>
					<span className='separator'>:&nbsp;</span>
					<ChatMessageText text={msg.text} hideNsfw={hideNsfw} hideNsfl={hideNsfl} />
				</Container>
			);
		} else
			return (
				<Container type={msg.type}>
					<AuthorContainer>{messageIcon[msg.type]}</AuthorContainer>
					<span className='separator'>&nbsp;</span>
					<Text>{msg.text}</Text>
				</Container>
			);
	}
);

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
