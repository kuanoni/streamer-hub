import OptionsCheckbox from './OptionsCheckbox';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';
import OptionsDropdown from './OptionsDropdown';
import { AbsoluteContainer } from '@/modules/chat/styles';
import { Section, OptionItem } from '../types';
import ChatOptionsContext from './context/ChatOptionsContext';

const Container = styled(AbsoluteContainer, {
	backgroundColor: theme.colors.cover,
});

const Header = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.action,
	borderBottom: `1px solid ${theme.colors.grey700}`,
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
	padding: '.5rem 0',
});

const OptionsSection = styled('div', {
	padding: '.5rem 0',
	'.title': {
		padding: '0 .5rem',
		paddingBottom: '.25rem',
		color: theme.colors.textDark,
		fontSize: '.94rem',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
});

const initialState: { [index: string]: string | boolean } = {
	showFlair: false,
	showTime: true,
	hideNsfw: true,
	hideNsfl: true,
	censorBadWords: false,
	bannedMessages: 'censor',
};

const sectionsTemplate: Section[] = [
	{
		title: 'Messages',
		content: [
			{ label: 'Show flair', key: 'showFlair', type: 'checkbox' },
			{ label: 'Show time', key: 'showTime', type: 'checkbox' },
			{ label: 'Hide messages with nsfw', key: 'hideNsfw', type: 'checkbox' },
			{ label: 'Hide messages with nsfl', key: 'hideNsfl', type: 'checkbox' },
			{ label: 'Censor bad words', key: 'censorBadWords', type: 'checkbox' },
			{
				label: 'Banned messages',
				key: 'bannedMessages',
				type: 'dropdown',
				options: ['show', 'censor', 'remove'],
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
	setIsChatOptionsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatOptions = ({ setIsChatOptionsOpen }: Props) => {
	const ctx = useContext(ChatOptionsContext);

	const getOptionItemComponent = (item: OptionItem) => {
		if (!ctx) return <></>;

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

	const Sections = sectionsTemplate.map((section) => {
		return (
			<OptionsSection key={section.title}>
				<div className='title'>{section.title}</div>
				{section.content.map((item: OptionItem) => getOptionItemComponent(item))}
			</OptionsSection>
		);
	});

	return (
		<Container>
			<Header>
				<h2>Options</h2>
				<CloseButton onClick={() => setIsChatOptionsOpen(false)}>
					<BsX />
				</CloseButton>
			</Header>
			<OptionsContent>{Sections}</OptionsContent>
		</Container>
	);
};

export default ChatOptions;
