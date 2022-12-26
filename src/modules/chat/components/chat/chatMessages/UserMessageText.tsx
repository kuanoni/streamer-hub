import React, { ReactNode, useState } from 'react';
import { styled } from 'stiches.config';

import { injectTextWithEmotes } from '@modules/chat/utils/injectTextWithEmotes';
import { injectTextWithLinks } from '@modules/chat/utils/injectTextWithLinks';

const Text = styled('span', {
	wordWrap: 'break-word',
	verticalAlign: 'top',
});

const containsWord = (textArr: ReactNode[], word: string) =>
	!textArr.every((text) => {
		if (typeof text !== 'string') return true;
		return text.trim().toUpperCase() !== word.trim().toUpperCase();
	});

interface Props {
	text: string | (string | ReactNode)[];
}

const UserMessageText = ({ text }: Props) => {
	const [isCensored, setIsCensored] = useState(true);

	const [textWithEmotes, hasEmotes] = injectTextWithEmotes(text);
	const [textWithLinks, hasLinks] = injectTextWithLinks(textWithEmotes);
	const newText = textWithLinks;

	const textHasNsfw = containsWord(newText, 'nsfw');
	const textHasNsfl = containsWord(newText, 'nsfl');

	const censoredClass = hasLinks && textHasNsfl ? 'nsfl' : hasLinks && textHasNsfw ? 'nsfw' : '';

	return (
		<Text className={isCensored ? censoredClass : ''} onClick={() => setIsCensored(false)}>
			{newText.map((item, i) => (
				<React.Fragment key={i}>{item}</React.Fragment>
			))}
		</Text>
	);
};

export default UserMessageText;
