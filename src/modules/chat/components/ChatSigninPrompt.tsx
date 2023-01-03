import Link from 'next/link';
import React from 'react';
import { styled, theme } from 'stiches.config';

const Container = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '.5rem',
	color: theme.colors.textLight,
	backgroundColor: 'rgba(0,0,0,0.5)',
	zIndex: 2,
});

const ButtonsContainer = styled('div', {
	display: 'flex',
	gap: '1rem',
	'button, a': {
		padding: '.25rem .75rem',
		border: 'none',
		borderRadius: theme.space.borderRadHalf,
		color: theme.colors.textLight,
		fontSize: '1rem',
		cursor: 'pointer',
	},
	'.signin': {
		backgroundColor: theme.colors.primary400,
	},
	'.close': {
		backgroundColor: theme.colors.grey500,
	},
	'.signin:hover': {
		backgroundColor: theme.colors.primary300,
	},
	'.close:hover': {
		backgroundColor: theme.colors.grey400,
	},
});

type Props = {
	closePopup: () => void;
};

const ChatSigninPrompt = ({ closePopup }: Props) => {
	return (
		<Container>
			You must sign in to chat
			<ButtonsContainer>
				<Link href={'#signin'} className='signin' onClick={() => closePopup()}>
					Sign In
				</Link>
				<button className='close' onClick={() => closePopup()}>
					Close
				</button>
			</ButtonsContainer>
		</Container>
	);
};

export default ChatSigninPrompt;
