import { ReactNode } from 'react';
import { styled } from 'stiches.config';

const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

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
	let injectedText = text;

	if (Array.isArray(text))
		injectedText = text.flatMap((item, i) => {
			if (typeof item !== 'string') return item;

			if (item.match(regex)) {
				hasLinks = true;

				return (
					<StyledLink key={i} href={item}>
						{item}
					</StyledLink>
				);
			} else return ' ' + item + ' ';
		});
	else
		injectedText = text.split(' ').flatMap((item, i) => {
			if (item.match(regex)) {
				hasLinks = true;

				return (
					<StyledLink key={i} href={item}>
						{item}
					</StyledLink>
				);
			} else return ' ' + item + ' ';
		});

	return [injectedText, hasLinks];
};
