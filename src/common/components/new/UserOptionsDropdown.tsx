import React from 'react';
import { BsBoxArrowLeft, BsGlobe, BsQuestionCircleFill } from 'react-icons/bs';
import { keyframes, styled } from 'stiches.config';

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(-10px) translateY(100%)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px) translateY(100%)',
	},
});

const Options = styled('div', {
	position: 'absolute',
	bottom: -10,
	right: '.5rem',
	left: 0,
	display: 'flex',
	flexDirection: 'column',
	padding: '.5rem 0',

	backgroundColor: '$action',
	borderRadius: 10,
	transform: 'translateY(100%)',
	animation: `${moveIn} .25s`,
});

const LinkButton = styled('a', {
	display: 'flex',
	alignItems: 'center',
	gap: '.5rem',
	height: '2rem',
	padding: '0 .5rem',
	color: '$textDark',
	fontSize: '.875rem',
	cursor: 'pointer',
	'&:hover': {
		color: '$text',
		backgroundColor: '$primary',
	},
	svg: {
		height: '50%',
	},
});

const Separator = styled('div', {
	height: 1,
	margin: '.5rem',
	borderBottom: '1px solid $textDarker',
});

const UserOptionsDropdown = React.forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<Options ref={ref}>
			<LinkButton>
				<BsQuestionCircleFill />
				Support
			</LinkButton>
			<LinkButton>
				<BsGlobe />
				Languages
			</LinkButton>
			<Separator />
			<LinkButton>
				<BsBoxArrowLeft />
				Sign In
			</LinkButton>
		</Options>
	);
});

export default UserOptionsDropdown;
