import { injectTextWithEmotes } from '@modules/chat/utils/injectTextWithEmotes';
import { injectTextWithLinks } from '@modules/chat/utils/injectTextWithLinks';
import React, { ReactNode, useState } from 'react';
import { styled } from 'stiches.config';

const Text = styled('span', {
	maxWidth: '100%',
	wordWrap: 'break-word',
});

const containsWord = (textArr: ReactNode[], word: string) =>
	!textArr.every((text) => {
		if (typeof text !== 'string') return true;
		return text.trim().toUpperCase() !== word.trim().toUpperCase();
	});

interface Props {
	text: string;
}

const ChatMessageText = ({ text }: Props) => {
	const [isCensored, setIsCensored] = useState(true);

	const [textWithEmotes, hasEmotes] = injectTextWithEmotes(text);
	const [textWithLinks, hasLinks] = injectTextWithLinks(textWithEmotes);
	const newText = textWithLinks;

	const textHasNsfw = containsWord(newText, 'nsfw');
	const textHasNsfl = containsWord(newText, 'nsfl');

	const censoredClass = hasLinks && textHasNsfl ? 'nsfl' : hasLinks && textHasNsfw ? 'nsfw' : '';

	return (
		<Text className={isCensored ? censoredClass : ''} onClick={() => setIsCensored(false)}>
			{newText}
		</Text>
	);
};

export default ChatMessageText;
