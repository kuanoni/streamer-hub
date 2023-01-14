import { styled } from 'stiches.config';

import { borderColor } from '../../common';

const Footer = styled('footer', {
	padding: '24px 0',
	border: `1px solid ${borderColor}`,
	borderTop: 'none',
	borderBottomLeftRadius: 12,
	borderBottomRightRadius: 12,
	fontFamily: 'inherit',
	'&:hover': {
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

const FooterButton = styled('a', {
	display: 'flex',
	alignItems: 'center',
	width: 'min-content',
	height: 36,
	margin: '0 auto',
	padding: '0 16px',
	color: '#fff',
	backgroundColor: 'hsl(32, 100%, 44%)',
	borderWidth: 0,
	borderRadius: 9999,
	fontFamily: 'inherit',
	fontSize: 15,
	fontWeight: 700,
	whiteSpace: 'nowrap',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'hsl(32, 100%, 39%)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

interface Props {}

const RedditSectionFooter = ({}: Props) => {
	return (
		<Footer>
			<FooterButton href='https://www.reddit.com/r/Destiny/' target='_blank'>
				View more on Reddit
			</FooterButton>
		</Footer>
	);
};

export default RedditSectionFooter;
