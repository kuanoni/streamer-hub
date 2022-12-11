import { ReactNode } from 'react';
import { StyledEmote } from '../styles';
import { EmoteKeys, Emotes } from './ChatEmotes';

type InjectTextWithEmotes = (text: string) => [injectedText: (string | ReactNode)[], hasEmotes: boolean];

export const injectTextWithEmotes: InjectTextWithEmotes = (text) => {
	let hasEmotes = false;

	const injectedText = text.split(' ').flatMap((item, i) => {
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
