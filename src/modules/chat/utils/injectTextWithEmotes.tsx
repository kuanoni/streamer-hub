import { ReactNode } from 'react';

import { StyledEmote } from '../styles';
import { EmoteComponents, EmoteKeys } from './ChatEmotes';

type InjectTextWithEmotes = (
	text: string | (string | ReactNode)[]
) => [injectedText: (string | ReactNode)[], hasEmotes: boolean];

export const injectTextWithEmotes: InjectTextWithEmotes = (text) => {
	let hasEmotes = false;

	// split any words into individual array items
	const splitText = Array.isArray(text)
		? text.flatMap((item) => {
				if (typeof item !== 'string') return item;
				return item.split(' ');
		  })
		: text.split(' ');

	const newText = splitText.reduce((arr: ReactNode[], currentValue, i) => {
		if (typeof currentValue !== 'string') return [...arr, currentValue];

		// replace string with emote node
		if (EmoteKeys.includes(currentValue)) {
			hasEmotes = true;

			return [
				...arr,
				<StyledEmote as='span' key={i}>
					{EmoteComponents[currentValue]}
				</StyledEmote>,
			];
		}

		// concatenate current and previous string values
		const prevValue = arr[arr.length - 1];
		if (typeof prevValue === 'string') {
			const newValue = `${prevValue} ${currentValue}`;
			return [...arr.slice(0, arr.length - 2), newValue];
		}

		return [...arr, currentValue];
	}, []);

	return [newText, hasEmotes];
};
