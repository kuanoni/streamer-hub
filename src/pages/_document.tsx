import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText, globalCss } from 'stiches.config';

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
		color: '$text',
		background:
			'radial-gradient(83.01% 75.78% at 80.58% 81.62%, rgba(53, 0, 255, 0.063) 21.39%, rgba(21, 17, 38, 0) 100%), radial-gradient(35.36% 170.61% at 22.03% 20.19%, rgba(126, 148, 255, 0.084) 16.22%, rgba(45, 50, 72, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #050509',
		fontFamily: `DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
	},
	a: {
		textDecoration: 'none',
		color: 'inherit',
	},
});

export default function Document() {
	globalStyles();

	return (
		<Html>
			<Head>
				<style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
			</Head>
			<body>
				<Main />
				<div id='portal' />
				<NextScript />
			</body>
		</Html>
	);
}
