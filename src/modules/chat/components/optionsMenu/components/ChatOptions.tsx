import React, { useContext } from 'react';
import { styled, theme } from 'stiches.config';

import ChatPopup from '../../ChatPopup';
import { OptionItem, Section } from '../types';
import ChatOptionsContext from './context/ChatOptionsContext';
import OptionsCheckbox from './OptionsCheckbox';
import OptionsDropdown from './OptionsDropdown';

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
			{ label: 'Show badges', key: 'showBadges', type: 'checkbox' },
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

	// creates components from Section template items
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
		<ChatPopup>
			<ChatPopup.Header title='Options' closePopup={closePopup}></ChatPopup.Header>
			<ChatPopup.Content>
				{sectionsTemplate.map((section) => {
					return (
						<OptionsSection key={section.title}>
							<div className='title'>{section.title}</div>
							{section.content.map((item: OptionItem) => getOptionItemComponent(item))}
						</OptionsSection>
					);
				})}
			</ChatPopup.Content>
		</ChatPopup>
	);
};

export default ChatOptions;
