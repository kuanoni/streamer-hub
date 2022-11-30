import { StaticImageData } from 'next/image';
import ResidentSleeper from '../../../../public/images/emotes/ResidentSleeper.png';
import LUL from '../../../../public/images/emotes/LUL.png';
import BUNGER from '../../../../public/images/emotes/BUNGER.gif';
import BibleThump from '../../../../public/images/emotes/BibleThump.png';
import CoolCat from '../../../../public/images/emotes/CoolCat.png';
import BabyRage from '../../../../public/images/emotes/BabyRage.png';
import { CSS } from '@stitches/react';
import { StyledEmote } from '../styles';

interface EmotesIface {
	[index: string]: React.ReactNode;
}

const buildEmoteComponent = (name: string, src: StaticImageData, css?: CSS) => {
	return <StyledEmote src={src} alt={name} title={name} css={css || {}} />;
};

export const Emotes: EmotesIface = {
	ResidentSleeper: buildEmoteComponent('ResidentSleeper', ResidentSleeper),
	LUL: buildEmoteComponent('LUL', LUL),
	BUNGER: buildEmoteComponent('BUNGER', BUNGER, { maxWidth: 48 }),
	BibleThump: buildEmoteComponent('BibleThump', BibleThump),
	CoolCat: buildEmoteComponent('CoolCat', CoolCat),
	BabyRage: buildEmoteComponent('BabyRage', BabyRage),
};

export const EmoteKeys = Object.keys(Emotes);
