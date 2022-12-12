import { StaticImageData } from 'next/image';
import ResidentSleeper from '../../../../public/images/emotes/ResidentSleeper.png';
import LUL from '../../../../public/images/emotes/LUL.png';
import BUNGER from '../../../../public/images/emotes/BUNGER.gif';
import BibleThump from '../../../../public/images/emotes/BibleThump.png';
import CoolCat from '../../../../public/images/emotes/CoolCat.png';
import BabyRage from '../../../../public/images/emotes/BabyRage.png';
import EZY from '../../../../public/images/emotes/EZY.png';
import MonkaW from '../../../../public/images/emotes/MonkaW.png';
import OMEGALUL from '../../../../public/images/emotes/OMEGALUL.png';
import Pog from '../../../../public/images/emotes/Pog.png';
import POGGERS from '../../../../public/images/emotes/POGGERS.png';
import Clap from '../../../../public/images/emotes/Clap.gif';
import ForsenGun from '../../../../public/images/emotes/ForsenGun.png';

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
	EZY: buildEmoteComponent('EZY', EZY),
	MonkaW: buildEmoteComponent('MonkaW', MonkaW, { maxWidth: 30, maxHeight: 30 }),
	OMEGALUL: buildEmoteComponent('OMEGALUL', OMEGALUL),
	Pog: buildEmoteComponent('Pog', Pog),
	POGGERS: buildEmoteComponent('POGGERS', POGGERS),
	Clap: buildEmoteComponent('Clap', Clap),
	ForsenGun: buildEmoteComponent('ForsenGun', ForsenGun),
};

export const EmoteKeys = Object.keys(Emotes);
