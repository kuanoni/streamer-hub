import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
			frosted: 'hsla(0, 0%, 100%, 0.15)',
			frostedPrimary: 'hsla(275, 100%, 67%, 0.25)',

			grey900: 'hsl(253, 15%, 6%)',
			grey800: 'hsl(253, 15%, 12%)',
			grey700: 'hsl(255, 15%, 20%)',
			grey600: 'hsl(254, 15%, 28%)',
			grey500: 'hsl(255, 15%, 36%)',
			grey400: 'hsl(256, 15%, 44%)',
			grey300: 'hsl(255, 15%, 52%)',
			grey200: 'hsl(254, 15%, 60%)',
			grey100: 'hsl(254, 15%, 68%)',

			primary900: 'hsl(276, 100%, 6%)',
			primary800: 'hsl(276, 100%, 11%)',
			primary700: 'hsl(276, 100%, 15%)',
			primary600: 'hsl(276, 100%, 21%)',
			primary500: 'hsl(276, 100%, 27%)',
			primary400: 'hsl(276, 100%, 33%)',
			primary300: 'hsl(275, 100%, 39%)',
			primary200: 'hsl(275, 100%, 46%)',
			primary100: 'hsl(276, 100%, 52%)',

			secondary900: 'hsl(118, 100%, 24%)',
			secondary800: 'hsl(118, 100%, 30%)',
			secondary700: 'hsl(118, 100%, 35%)',
			secondary600: 'hsl(118, 100%, 40%)',
			secondary500: 'hsl(118, 100%, 45%)',
			secondary400: 'hsl(118, 100%, 50%)',
			secondary300: 'hsl(118, 100%, 56%)',
			secondary200: 'hsl(118, 100%, 63%)',
			secondary100: 'hsl(118, 100%, 68%)',

			textLight: 'hsl(180, 4%, 89%)',
			textLightActive: 'hsl(180, 4%, 100%)',
			textMedium: 'hsl(210, 4%, 54%)',
			textMediumActive: 'hsl(210, 4%, 73%)',
			textDark: 'hsl(255, 20%, 41%)',
			textDarkActive: 'hsl(255, 20%, 59%)',

			textLink: 'hsl(204, 78%, 53%)',
			textPrimaryMedium: 'hsl(275, 100%, 71%)',

			info: 'hsl(180, 63%, 40%)',
			success: 'hsl(120, 63%, 40%)',
			error: 'hsl(0, 63%, 53%)',
		},
		space: {
			pageWidth: '1140px',

			borderRad: '5px',
			borderRadHalf: '2.5px',
		},
	},
	media: {
		xxs: '(max-width: 375px) and (orientation:portrait)',
		xs: '(max-width: 529px) and (orientation:portrait)',
		sm: '(max-width: 768px) and (orientation:portrait)',
		md: '(max-width: 1024px) and (orientation:portrait)',
		lg: '(min-width: 1025px) and (orientation:portrait)',

		l_xxs: '(max-height: 375px) and (orientation:landscape)',
		l_xs: '(max-height: 529px) and (orientation:landscape)',
		l_sm: '(max-height: 768px) and (orientation:landscape)',
		l_md: '(max-height: 1024px) and (orientation:landscape)',
		l_lg: '(min-height: 1025px) and (orientation:landscape)',
	},
	utils: {
		marginX: (value: number) => ({ marginLeft: value, marginRight: value }),
	},
});
