import Link from 'next/link';
import React from 'react';
import { styled } from 'stiches.config';

const Container = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '.5rem',
	color: '#fff',
	backgroundColor: 'rgba(0,0,0,0.5)',
	zIndex: 2,
});

const ButtonsContainer = styled('div', {
	display: 'flex',
	gap: '1rem',
	'button, a': {
		padding: '.25rem .75rem',
		border: 'none',
		color: '$text',
		fontSize: '1rem',
		cursor: 'pointer',
	},
	'a.signin': {
		backgroundColor: '#2c6d95',
	},
	'button.close': {
		backgroundColor: '$bg',
	},
	'button:hover, a:hover': {
		filter: 'brightness(1.25)',
	},
});

const ChatSigninPrompt = ({ setIsOpen }: { setIsOpen: Function }) => {
	return (
		<Container>
			You must sign in to chat
			<ButtonsContainer>
				<Link href={'/'} className='signin'>
					Sign In
				</Link>
				<button className='close' onClick={() => setIsOpen(false)}>
					Close
				</button>
			</ButtonsContainer>
		</Container>
	);
};

export default ChatSigninPrompt;
