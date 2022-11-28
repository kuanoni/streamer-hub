import Image from 'next/image';
import { styled } from 'stiches.config';
import ResidentSleeper from '../../../../public/images/emotes/ResidentSleeper.png';
import LUL from '../../../../public/images/emotes/LUL.png';
import BUNGER from '../../../../public/images/emotes/BUNGER.gif';
import BibleThump from '../../../../public/images/emotes/BibleThump.png';
import CoolCat from '../../../../public/images/emotes/CoolCat.png';
import BabyRage from '../../../../public/images/emotes/BabyRage.png';

const StyledEmote = styled(Image, {
	margin: '-.5rem 0',
	verticalAlign: 'middle',
	maxHeight: 32,
});

interface EmotesIface {
	[index: string]: Function;
}

export const Emotes: EmotesIface = {
	ResidentSleeper: (i: string | number) => <StyledEmote key={i} src={ResidentSleeper} alt='ResidentSleeper' />,
	LUL: (i: string | number) => <StyledEmote key={i} src={LUL} alt='LUL' />,
	BUNGER: (i: string | number) => <StyledEmote key={i} src={BUNGER} alt='BUNGER' css={{ maxWidth: 48 }} />,
	BibleThump: (i: string | number) => <StyledEmote key={i} src={BibleThump} alt='BibleThump' />,
	CoolCat: (i: string | number) => <StyledEmote key={i} src={CoolCat} alt='CoolCat' />,
	BabyRage: (i: string | number) => <StyledEmote key={i} src={BabyRage} alt='BabyRage' />,
};

export const EmoteKeys = Object.keys(Emotes);
