import { styled } from 'stiches.config';

export const RelativeContainer = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',
});

export const AbsoluteContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	height: '100%',
});

export const GridContainer = styled(AbsoluteContainer, {
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
});
