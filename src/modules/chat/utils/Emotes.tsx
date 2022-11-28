import Image, { StaticImageData } from 'next/image';
import { styled } from 'stiches.config';
import ResidentSleeper from '../../../../public/images/emotes/ResidentSleeper.png';
import LUL from '../../../../public/images/emotes/LUL.png';
import BUNGER from '../../../../public/images/emotes/BUNGER.gif';
import BibleThump from '../../../../public/images/emotes/BibleThump.png';
import CoolCat from '../../../../public/images/emotes/CoolCat.png';
import BabyRage from '../../../../public/images/emotes/BabyRage.png';
import { CSS } from '@stitches/react';

const StyledEmote = styled(Image, {
	margin: '-.5rem 0',
	verticalAlign: 'middle',
	maxHeight: 32,
});

interface EmotesIface {
	[index: string]: Function;
}

const buildEmoteComponent = (name: string, src: StaticImageData, css?: CSS) => {
	return (i: string | number) => <StyledEmote key={i} src={src} alt={name} title={name} css={css || {}} />;
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
