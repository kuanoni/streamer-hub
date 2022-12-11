import Image from 'next/image';
import { styled } from 'stiches.config';

export const MessageBoxContainer = styled('div', {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: '.5rem',
});

export const StyledEmote = styled(Image, {
	margin: '-.5rem 0',
	verticalAlign: 'middle',
	maxHeight: 32,
});

export const AbsoluteContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	height: '100%',
});
