import React, { Dispatch, SetStateAction, useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { keyframes } from '@stitches/react';

import { OptionItem, Section } from '../types';
import ChatOptionsContext from './context/ChatOptionsContext';
import OptionsCheckbox from './OptionsCheckbox';
import OptionsDropdown from './OptionsDropdown';

const fadeIn = keyframes({
	'0%': {
		opacity: 0.6,
	},
	'100%': {
		opacity: 1,
	},
});

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	fontSize: '.9rem',
	animation: `${fadeIn} .2s`,
});

const Header = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	paddingLeft: '1rem',
	backgroundColor: theme.colors.primary900,
	borderBottom: `1px solid ${theme.colors.trinary700}`,
	h2: {
		margin: 0,
		fontSize: '1.25rem',
	},
});

const CloseButton = styled('button', {
	height: '1.75rem',
	padding: 0,
	backgroundColor: 'transparent',
	border: 'none',
	color: theme.colors.textMedium,
	aspectRatio: 1,
	cursor: 'pointer',
	'&:hover': {
		color: theme.colors.textMediumActive,
	},
	svg: {
		width: '100%',
		height: '100%',
		aspectRatio: 1,
	},
});

const OptionsContent = styled('div', {
	height: '100%',
	padding: '.5rem 0',
	overflowY: 'scroll',
	scrollbarWidth: 'thin',
});

const OptionsSection = styled('div', {
	padding: '.5em 0',
	'.title': {
		padding: '0 .5em',
		paddingBottom: '.25em',
		color: theme.colors.textDark,
		fontSize: '.94em',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
});

const sectionsTemplate: Section[] = [
	{
		title: 'Messages',
		content: [
			{ label: 'Show flair', key: 'showFlair', type: 'checkbox' },
			{ label: 'Show time', key: 'showTime', type: 'checkbox' },
			{ label: 'Censor NSFW links', key: 'hideNsfw', type: 'checkbox' },
			{ label: 'Censor NSFL links', key: 'hideNsfl', type: 'checkbox' },
			{ label: 'Censor bad words', key: 'censorBadWords', type: 'checkbox' },
			{
				label: 'Banned messages',
				key: 'bannedMessages',
				type: 'dropdown',
				options: ['censor', 'remove'],
			},
		],
	},
	{
		title: 'Notifications',
		content: [{ label: 'Close after short period', key: 'closeShortPeriod', type: 'checkbox' }],
	},
	{
		title: 'Whispers',
		content: [
			{ label: 'Notification', key: 'whisperNotification', type: 'checkbox' },
			{ label: 'In-line messages', key: 'whisperInlineMessages', type: 'checkbox' },
		],
	},
	{
		title: 'Highlights, Focus & Tags',
		content: [
			{ label: 'Highlight when mentioned', key: 'highlightMentioned', type: 'checkbox' },
			{ label: 'Include mentions when focused', key: 'mentionsWhenFocused', type: 'checkbox' },
			{ label: 'Increased visibility of tagged users', key: 'visibleTaggedUsers', type: 'checkbox' },
		],
	},
];

type Props = {
	closePopup: () => void;
};

const ChatOptions = ({ closePopup }: Props) => {
	const ctx = useContext(ChatOptionsContext);

	if (!ctx) return <></>;

	const getOptionItemComponent = (item: OptionItem) => {
		switch (item.type) {
			case 'checkbox': {
				return (
					<OptionsCheckbox
						key={item.key}
						optionKey={item.key}
						value={ctx.chatOptions[item.key] as boolean}
						setValue={ctx.changeOption}
					>
						{item.label}
					</OptionsCheckbox>
				);
			}
			case 'dropdown': {
				return (
					<OptionsDropdown
						key={item.key}
						optionKey={item.key}
						options={item.options}
						value={ctx.chatOptions[item.key] as string}
						setValue={ctx.changeOption}
					>
						{item.label}
					</OptionsDropdown>
				);
			}
		}
	};

	return (
		<Container>
			<Header>
				<h2>Options</h2>
				<CloseButton onClick={() => closePopup()}>
					<BsX />
				</CloseButton>
			</Header>
			<OptionsContent>
				{sectionsTemplate.map((section) => {
					return (
						<OptionsSection key={section.title}>
							<div className='title'>{section.title}</div>
							{section.content.map((item: OptionItem) => getOptionItemComponent(item))}
						</OptionsSection>
					);
				})}
			</OptionsContent>
		</Container>
	);
};

export default ChatOptions;
