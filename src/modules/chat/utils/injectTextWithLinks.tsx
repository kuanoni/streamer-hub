import Joi from 'joi';
import { ReactNode } from 'react';
import { styled } from 'stiches.config';

const url = Joi.string().uri();

const StyledLink = styled('a', {
	color: '#0069c2',
	'&:hover': {
		textDecoration: 'underline',
	},
});

type InjectTextWithLinks = (
	text: string | (string | ReactNode)[]
) => [injectedText: (string | ReactNode)[], hasLinks: boolean];

export const injectTextWithLinks: InjectTextWithLinks = (text) => {
	let hasLinks = false;

	// split any words into individual array items
	const splitText = Array.isArray(text)
		? text.flatMap((item) => {
				if (typeof item !== 'string') return item;
				return item.split(' ');
		  })
		: text.split(' ');

	const newText = splitText.reduce((arr: ReactNode[], currentValue, i) => {
		if (typeof currentValue !== 'string') return [...arr, currentValue];

		const { error } = url.validate(currentValue);

		if (!error) {
			hasLinks = true;

			return [
				...arr,
				<StyledLink key={i} href={currentValue}>
					{currentValue}
				</StyledLink>,
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

	return [newText, hasLinks];
};
