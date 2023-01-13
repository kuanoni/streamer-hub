import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
	theme: {
		colors: {
			grey1000: 'hsl(253, 15%, 6%)',
			grey900: 'hsl(253, 15%, 12%)',
			grey800: 'hsl(255, 15%, 20%)',
			grey700: 'hsl(254, 15%, 28%)',
			grey600: 'hsl(255, 15%, 36%)',
			grey500: 'hsl(256, 15%, 44%)',
			grey400: 'hsl(255, 15%, 52%)',
			grey300: 'hsl(254, 15%, 60%)',
			grey200: 'hsl(254, 15%, 68%)',
			grey100: 'hsl(253, 15%, 76%)',
			grey000: 'hsl(255, 15%, 84%)',

			primary900: 'hsl(276, 100%, 33%)',
			primary800: 'hsl(275, 100%, 39%)',
			primary700: 'hsl(275, 100%, 46%)',
			primary600: 'hsl(276, 100%, 52%)',
			primary500: 'hsl(275, 100%, 59%)',
			primary400: 'hsl(275, 100%, 65%)',
			primary300: 'hsl(275, 100%, 71%)',
			primary200: 'hsl(275, 100%, 77%)',
			primary100: 'hsl(276, 100%, 83%)',
			primary000: 'hsl(276, 100%, 89%)',

			secondary900: 'hsl(186, 100%, 26%)',
			secondary800: 'hsl(185, 100%, 31%)',
			secondary700: 'hsl(185, 100%, 37%)',
			secondary600: 'hsl(186, 100%, 42%)',
			secondary500: 'hsl(185, 100%, 47%)',
			secondary400: 'hsl(185, 100%, 52%)',
			secondary300: 'hsl(185, 100%, 59%)',
			secondary200: 'hsl(186, 100%, 64%)',
			secondary100: 'hsl(186, 100%, 71%)',
			secondary000: 'hsl(186, 100%, 77%)',

			trinary900: 'hsl(118, 100%, 25%)',
			trinary800: 'hsl(118, 100%, 30%)',
			trinary700: 'hsl(118, 100%, 35%)',
			trinary600: 'hsl(118, 100%, 40%)',
			trinary500: 'hsl(118, 100%, 45%)',
			trinary400: 'hsl(118, 100%, 50%)',
			trinary300: 'hsl(118, 100%, 56%)',
			trinary200: 'hsl(118, 100%, 63%)',
			trinary100: 'hsl(118, 100%, 68%)',
			trinary000: 'hsl(118, 100%, 75%)',

			textLight: 'hsl(180, 4%, 89%)',
			textLightActive: 'hsl(0, 0%, 100%)',

			textMedium: 'hsl(210, 4%, 54%)',
			textMediumActive: 'hsl(210, 4%, 65%)',

			textDark: 'hsl(255, 15%, 36%)',
			textDarkActive: 'hsl(255, 15%, 48%)',

			textLink: 'hsl(204, 78%, 53%)',
			textPrimaryMedium: 'hsl(275, 100%, 71%)',

			bg: 'hsl(276, 100%, 6%)',
			border: 'hsl(275, 100%, 13%)',

			xd: 'hsl(206, 7%, 20%)',

			frosted: 'hsla(0, 0%, 100%, 0.15)',
			frostedPrimary: 'hsla(275, 100%, 67%, 0.25)',
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
