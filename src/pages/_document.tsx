import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText, globalCss } from '../../stiches.config';

const globalStyles = globalCss({
	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},
	'html, body': {
		margin: 0,
		padding: 0,
		color: '$text',
		backgroundColor: '$bg',
		fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
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
