import Image from 'next/image';
import { styled } from 'stiches.config';
import ResidentSleeper from '../../../../public/images/emotes/ResidentSleeper.png';
import LUL from '../../../../public/images/emotes/LUL.png';
import BUNGER from '../../../../public/images/emotes/BUNGER.gif';

const StyledEmote = styled(Image, {
	margin: '-.5rem 0',
	verticalAlign: 'middle',
	width: '100%',
	height: '100%',
	maxWidth: 32,
	maxHeight: 32,
});

interface EmotesIface {
	[index: string]: Function;
}

export const Emotes: EmotesIface = {
	ResidentSleeper: (i: string | number) => <StyledEmote key={i} src={ResidentSleeper} alt='ResidentSleeper' />,
	LUL: (i: string | number) => <StyledEmote key={i} src={LUL} alt='LUL' />,
	BUNGER: (i: string | number) => <StyledEmote key={i} src={BUNGER} alt='BUNGER' css={{ maxWidth: 48 }} />,
};

export const EmoteKeys = Object.keys(Emotes);
