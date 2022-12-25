import Image from 'next/image';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { Rank } from '@globalTypes/custom-auth';
import { UserMessage } from '@globalTypes/socketio';
import Tier1 from '@images/flairs/tier_1.png';
import Tier2 from '@images/flairs/tier_2.png';
import Tier3 from '@images/flairs/tier_3.png';
import { MessageType, RankColors } from '@modules/chat/common';

import UserMessageText from './UserMessageText';

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
		display: 'inline-block',
		color: theme.colors.textMedium,
		fontSize: '.75em',
		marginRight: 4,
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
		},
	},
});

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
	[`svg, img`]: {
		maxWidth: '1rem',
		maxHeight: '1rem',
		verticalAlign: 'middle',
		marginRight: '.25em',
	},

	variants: {
		rank: RankColors,
	},
});

const RankFlair: { [index: string]: React.ReactNode } = {
	[Rank.TIER_1]: <Image src={Tier1} alt='Tier 1 subscriber' />,
	[Rank.TIER_2]: <Image src={Tier2} alt='Tier 2 subscriber' />,
	[Rank.TIER_3]: <Image src={Tier3} alt='Tier 3 subscriber' />,
};

interface Props {
	msg: UserMessage;
	setFocusedUser: (user: string) => void;
	censorBadWords: boolean;
}

const ChatMessage = React.memo(({ msg, setFocusedUser, censorBadWords }: Props) => {
	const dateObj = new Date(msg.time);
	const timeTitle = timeTitleFormatter.format(dateObj);
	const timeValue = timeValueFormatter.format(dateObj);

	return (
		<Container className='msg' data-author={msg.author}>
			<time title={timeTitle}>{timeValue}</time>
			<Author className='author' onClick={() => setFocusedUser(msg.author)}>
				{msg.author}
			</Author>
			<span className='separator'>:&nbsp;</span>
			<UserMessageText text={msg.data} />
		</Container>
	);
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
