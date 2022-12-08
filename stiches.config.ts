import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
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

			primary900: '#16102E',
			primary800: '#241A4C',
			primary700: '#32246A',
			primary600: '#412F89',
			primary500: '#4F39A7',
			primary400: '#6149C1',
			primary300: '#7B67CB',
			primary200: '#9585D5',
			primary100: '#B0A4E0',
			primary000: '#CAC2EA',

			secondary900: '#102A42',
			secondary800: '#183E62',
			secondary700: '#215382',
			secondary600: '#2A68A2',
			secondary500: '#327DC3',
			secondary400: '#4D91D1',
			secondary300: '#6DA5D9',
			secondary200: '#8DB9E2',
			secondary100: '#AECDEA',
			secondary000: '#CEE1F2',

			textLight: '#E2E2E4',
			textLightActive: '#FFFFFF',
			textMedium: '#C2BCD3',
			textMediumActive: '#DDDAE7',
			textDark: '#554E6A',
			textDarkActive: '#71688D',

			textPrimary: '#7B67CB',
			textSecondary: '#6DA5D9',

			action: '#161D2E',
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
