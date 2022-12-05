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
			'radial-gradient(83.83% 173.31% at 29.99% 81.25%, rgba(53, 0, 255, 0.1) 0%, rgba(21, 17, 38, 0) 100%), #050509;',
		fontFamily: `DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
		Helvetica Neue, sans-serif`,
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
