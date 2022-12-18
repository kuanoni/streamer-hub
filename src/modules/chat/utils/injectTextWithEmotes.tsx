import { ReactNode } from 'react';

import { StyledEmote } from '../styles';
import { EmoteKeys, Emotes } from './ChatEmotes';

type InjectTextWithEmotes = (
	text: string | (string | ReactNode)[]
) => [injectedText: (string | ReactNode)[], hasEmotes: boolean];

export const injectTextWithEmotes: InjectTextWithEmotes = (text) => {
	let hasEmotes = false;
	const textArr = Array.isArray(text) ? text : text.split(' ');

	const injectedText = textArr.flatMap((item, i) => {
		if (typeof item !== 'string') return item;

		if (EmoteKeys.includes(item)) {
			hasEmotes = true;

			return [
				<StyledEmote as='span' key={i}>
					{Emotes[item]}
				</StyledEmote>,
				' ',
			];
		} else return ' ' + item + ' ';
	});

	return [injectedText, hasEmotes];
};
