import { Head, Html, Main, NextScript } from 'next/document';
import { getCssText, globalCss, theme } from 'stiches.config';

const globalStyles = globalCss({
	'@font-face': [
		{
			fontFamily: 'DM Sans',
			fontStyle: 'normal',
			fontWeight: 400,
			src: 'local("DM Sans"), url("fonts/DMSans-Regular.ttf")',
		},
		{
			fontFamily: 'DM Sans',
			fontStyle: 'normal',
			fontWeight: 500,
			src: 'local("DM Sans"), url("fonts/DMSans-Medium.ttf")',
		},
		{
			fontFamily: 'DM Sans',
			fontStyle: 'normal',
			fontWeight: 700,
			src: 'local("DM Sans"), url("fonts/DMSans-Bold.ttf")',
		},
	],
	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},
	'html, body': {
		margin: 0,
		padding: 0,
		color: theme.colors.textLight,
		background:
			'radial-gradient(83.01% 75.78% at 80.58% 81.62%, rgba(8, 255, 0, 0.04) 21.39%, rgba(33, 17, 38, 0) 100%), radial-gradient(35.36% 170.61% at 22.03% 20.19%, rgba(151, 0, 255, 0.08) 16.22%, rgba(45, 50, 72, 0) 100%) , #090408',
		fontFamily: `DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
	},
	'::-webkit-scrollbar': {
		width: 16,
		backgroundColor: 'hsl(276, 35%, 5%)',
	},
	'::-webkit-scrollbar-thumb': {
		backgroundColor: 'hsl(300, 1%, 42%)',
	},
	a: {
		textDecoration: 'none',
		color: theme.colors.textLink,
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

export default function Document() {
	globalStyles();

	return (
		<Html>
			<Head>
				<style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest'></link>
			</Head>
			<body>
				<Main />
				<div id='portal' />
				<NextScript />
			</body>
		</Html>
	);
}
