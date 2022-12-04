import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
			bgLightest: '#585858',
			bgLighter: '#484848',
			bgLight: '#383838',
			bg: '#282828',
			bgDark: '#222',
			bgDarker: '#111',
			bgDarkest: '#030303',
			// primary: '#ffaec8',
			// text: '#dedede',
			// textDark: '#878787',

			text: '#E2E2E4',
			textDark: '#C2BCD3',
			textDarker: '#514B65',
			action: '#161D2E',
			primary: '#4D38A2',
			primaryLight: '#5F47C1',
			cover: '#12101C',
		},
	},
	media: {
		bp1: '(min-width: 480px)',
	},
	utils: {
		marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
	},
});
