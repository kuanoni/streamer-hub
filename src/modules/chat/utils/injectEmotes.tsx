import { EmoteKeys, Emotes } from './Emotes';

export const injectEmotes = (text: string) => {
	return text.split(' ').flatMap((item, i) => {
		if (EmoteKeys.includes(item)) return [Emotes[item](i), ' '];
		else return ' ' + item + ' ';
	});
};
