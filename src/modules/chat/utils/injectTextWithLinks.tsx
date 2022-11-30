import { styled } from 'stiches.config';

const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

const StyledLink = styled('a', {
	color: '#0069c2',
	'&:hover': {
		textDecoration: 'underline',
	},
});

export const injectTextWithLinks = (text: string | (string | React.ReactNode)[]): (string | React.ReactNode)[] => {
	if (Array.isArray(text))
		return text.flatMap((item, i) => {
			if (typeof item !== 'string') return item;

			if (item.match(regex))
				return (
					<StyledLink key={i} href={item}>
						{item}
					</StyledLink>
				);
			else return ' ' + item + ' ';
		});
	else
		return text.split(' ').flatMap((item, i) => {
			if (item.match(regex))
				return (
					<StyledLink key={i} href={item}>
						{item}
					</StyledLink>
				);
			else return ' ' + item + ' ';
		});
};
