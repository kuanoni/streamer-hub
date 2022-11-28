import { StyledEmote } from '../styles';
import { EmoteKeys, Emotes } from './Emotes';

export const injectEmotes = (text: string): (string | React.ReactNode)[] => {
	return text.split(' ').flatMap((item, i) => {
		if (EmoteKeys.includes(item))
			return [
				<StyledEmote as='span' key={i}>
					{Emotes[item]}
				</StyledEmote>,
				' ',
			];
		else return ' ' + item + ' ';
	});
};
