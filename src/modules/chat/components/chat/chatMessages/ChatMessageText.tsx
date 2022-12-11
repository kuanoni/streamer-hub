import { injectTextWithEmotes } from '@/modules/chat/utils/injectTextWithEmotes';
import { injectTextWithLinks } from '@/modules/chat/utils/injectTextWithLinks';
import React, { ReactNode, useEffect, useState } from 'react';
import { styled, theme } from 'stiches.config';

const Text = styled('span', {
	maxWidth: '100%',
	wordWrap: 'break-word',
});

const CensoredText = styled('span', {
	color: theme.colors.secondary400,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
});

const hasNsfw = (textArr: ReactNode[]) =>
	!textArr.every((text) => {
		if (typeof text !== 'string') return true;
		return text.trim().toUpperCase() !== 'NSFW';
	});

const hasNsfl = (textArr: ReactNode[]) =>
	!textArr.every((text) => {
		if (typeof text !== 'string') return true;
		return text.trim().toUpperCase() !== 'NSFL';
	});

interface Props {
	text: string;
	hideNsfw: boolean;
	hideNsfl: boolean;
}

const ChatMessageText = ({ text, hideNsfw, hideNsfl }: Props) => {
	const [textWithEmotes, hasEmotes] = injectTextWithEmotes(text);
	const [textWithLinks, hasLinks] = injectTextWithLinks(textWithEmotes);
	const newText = textWithLinks;

	const textHasNsfw = hasNsfw(newText);
	const textHasNsfl = hasNsfl(newText);

	const [isCensored, setIsCensored] = useState(hasLinks && ((textHasNsfw && hideNsfw) || (textHasNsfl && hideNsfl)));

	// re-censors or un-censors when hideNsfw or hideNsfl options change
	useEffect(() => {
		setIsCensored(hasLinks && ((textHasNsfw && hideNsfw) || (textHasNsfl && hideNsfl)));
	}, [hasLinks, textHasNsfw, hideNsfw, textHasNsfl, hideNsfl]);

	if (isCensored)
		return (
			<CensoredText onClick={() => setIsCensored(false)}>
				{textHasNsfl ? '<nsfl>' : textHasNsfw ? '<nsfw>' : '<censored>'}
			</CensoredText>
		);

	return <Text>{newText}</Text>;
};

export default ChatMessageText;
