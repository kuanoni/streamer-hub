import { styled } from 'stiches.config';

import { borderColor } from '../../common';

const HeaderText = styled('span', {
	flexShrink: 1,
	marginTop: 3,
	color: 'rgb(231, 233, 234)',
	fontSize: 20,
	fontWeight: 700,
	lineHeight: '24px',
});

const HeaderButton = styled('button', {
	'&::before': {
		content: `Visit`,
	},
	'@md': {
		'&::before': {
			content: 'Visit on Reddit',
		},
	},

	display: 'flex',
	alignItems: 'center',
	height: 32,
	marginLeft: 'auto',
	padding: '0 16px',
	color: 'rgb(15, 20, 25)',
	backgroundColor: 'rgb(239, 243, 244)',
	borderWidth: 0,
	borderRadius: 9999,
	fontFamily: 'inherit',
	fontSize: 14,
	fontWeight: 700,
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgb(215, 219, 220)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
});

const Header = styled('a', {
	display: 'flex',
	padding: 12,
	border: `1px solid ${borderColor}`,
	borderBottom: 'none',
	borderTopLeftRadius: 12,
	borderTopRightRadius: 12,
	fontFamily: 'inherit',
	transition: 'background-color .2s',
	'&:hover': {
		backgroundColor: 'rgba(29, 155, 240, 0.1)',
		textDecoration: 'none',
		cursor: 'pointer',
	},
	[`&:hover ${HeaderText}`]: {
		textDecoration: 'underline',
	},
});

interface Props {}

const RedditSectionHeader = ({}: Props) => {
	return (
		<Header href='https://www.reddit.com/r/Destiny/' target='_blank'>
			<HeaderText>Posts from /r/Destiny</HeaderText>
			<HeaderButton />
		</Header>
	);
};

export default RedditSectionHeader;
