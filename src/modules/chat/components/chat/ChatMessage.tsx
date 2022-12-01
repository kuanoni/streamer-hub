import { styled } from 'stiches.config';
import React from 'react';
import { Message } from 'types/socketio';
import { MessageType } from '@/modules/chat/common';
import { injectTextWithEmotes } from '../../utils/injectTextWithEmotes';
import { injectTextWithLinks } from '../../utils/injectTextWithLinks';
import { BsShieldFillExclamation, BsInfoCircleFill } from 'react-icons/bs';
import { Rank } from 'types/custom-auth';

interface Props {
	msg: Message;
	setFocusedUser: (user: string) => void;
}

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
	display: 'flex',
	fontSize: 13,
	lineHeight: 1.75,
	padding: '.2em 1.2em .2em .6em',
	time: {
		display: 'none',
		color: '$textDark',
		fontSize: '.75em',
		marginRight: 4,
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

const AuthorContainer = styled('span', {
	display: 'flex',
	alignItems: 'center',
});

const Author = styled('span', {
	height: '100%',
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

	variants: {
		rank: {
			[Rank.DEFAULT]: {
				color: 'rgb(255, 255, 255)',
			},
			[Rank.TIER_1]: {
				color: 'rgb(72, 185, 190)',
			},
			[Rank.TIER_2]: {
				color: 'rgb(72, 185, 240)',
			},
			[Rank.TIER_3]: {
				color: 'rgb(20, 185, 255)',
			},
			[Rank.ORBITER]: {
				color: 'rgb(240, 151, 72)',
			},
			[Rank.OWNER]: {
				color: 'rgb(225, 53, 53)',
			},
		},
	},
});

const Text = styled('span', {
	maxWidth: '100%',
	wordWrap: 'break-word',
});

type MessageIconObject = {
	[index: number]: React.ReactNode;
};

const messageIcon: MessageIconObject = {
	[MessageType.SERVER]: <BsShieldFillExclamation />,
	[MessageType.INFO]: <BsInfoCircleFill />,
};

const ChatMessage = React.memo(({ msg, setFocusedUser }: Props) => {
	let newText = injectTextWithEmotes(msg.text);
	newText = injectTextWithLinks(newText);

	if (msg.type === MessageType.PUBLIC) {
		const dateObj = new Date(msg.time);
		const timeTitle = timeTitleFormatter.format(dateObj);
		const timeValue = timeValueFormatter.format(dateObj);

		return (
			<Container className='msg' data-author={msg.author}>
				<time title={timeTitle}>{timeValue}</time>
				<AuthorContainer>
					<Author rank={msg.rank} onClick={() => setFocusedUser(msg.author)}>
						{msg.author}
					</Author>
				</AuthorContainer>
				<span className='separator'>:&nbsp;</span>
				<Text>{newText}</Text>
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
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
