import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
			grey1000: 'rgb(16, 15, 17)',
			grey900: '#1C1A23',
			grey800: '#2F2B3B',
			grey700: '#423D52',
			grey600: '#554E6A',
			grey500: '#685F81',
			grey400: '#7B7297',
			grey300: '#918AA8',
			grey200: '#A7A1BA',
			grey100: '#BDB9CB',
			grey000: '#D3D0DC',

			primary900: '#6300a7',
			primary800: '#7600c8',
			primary700: '#8a00ea',
			primary600: '#9c0cff',
			primary500: '#a92eff',
			primary400: '#B74FFF',
			primary300: '#C26CFF',
			primary200: '#CE8AFF',
			primary100: '#DCA8FF',
			primary000: '#E9C7FF',

			secondary900: '#007986',
			secondary800: '#0092a0',
			secondary700: '#00aabb',
			secondary600: '#00c2d6',
			secondary500: '#00dbf0',
			secondary400: '#0ce9ff',
			secondary300: '#2FEBFD',
			secondary200: '#49EEFF',
			secondary100: '#6BF1FF',
			secondary000: '#88F3FF',

			trinary900: '#048000',
			trinary800: '#059900',
			trinary700: '#06b300',
			trinary600: '#06cc00',
			trinary500: '#07e600',
			trinary400: '#08FF00',
			trinary300: '#27FF1F',
			trinary200: '#47FF41',
			trinary100: '#62FF5D',
			trinary000: '#83FF7E',

			textLight: '#E2E4E4',
			textLightActive: '#FFFFFF',
			textMedium: '#C2BCD3',
			textMediumActive: '#DDDAE7',
			textDark: '#554E6A',
			textDarkActive: '#71688D',

			bg: '#140021',
			border: '#270043',

			frosted: 'rgba(255, 255, 255, 0.15)',
			frostedPrimary: 'rgba(187, 89, 255, 0.25)',
		},
		space: {
			pageWidth: '1140px',

			borderRad: '5px',
			borderRadHalf: '2.5px',
		},
	},
	media: {
		bp1: '(min-width: 480px)',
	},
	utils: {
		marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
	},
});
