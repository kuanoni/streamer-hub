import { StaticImageData } from 'next/image';

import BabyRage from '@images/emotes/BabyRage.png';
import BibleThump from '@images/emotes/BibleThump.png';
import BUNGER from '@images/emotes/BUNGER.gif';
import Clap from '@images/emotes/Clap.gif';
import CoolCat from '@images/emotes/CoolCat.png';
import EZY from '@images/emotes/EZY.png';
import ForsenGun from '@images/emotes/forsenGun.png';
import LUL from '@images/emotes/LUL.png';
import MonkaW from '@images/emotes/MonkaW.png';
import OMEGALUL from '@images/emotes/OMEGALUL.png';
import Pog from '@images/emotes/Pog.png';
import POGGERS from '@images/emotes/POGGERS.png';
import ResidentSleeper from '@images/emotes/ResidentSleeper.png';
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
