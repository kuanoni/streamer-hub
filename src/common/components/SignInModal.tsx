import React from 'react';
import { styled, theme } from 'stiches.config';

import Modal from './Modal';
import ProviderSignInButton from './ProviderSignInButton';

interface Props {
	isOpen: Boolean;
	close: Function;
}

const Container = styled('div', {
	width: 'min(95vw, 400px)',
	maxHeight: '70vh',
	padding: '2rem',
	color: theme.colors.textLight,
	backgroundColor: theme.colors.primary500,
	borderRadius: theme.space.borderRad,
	'& h1': {
		marginTop: 0,
	},
});

const SignIn = ({ isOpen, close }: Props) => {
	return (
		<Modal isOpen={isOpen} closeModal={close}>
			<Container>
				<h1>Sign In</h1>
				<ProviderSignInButton provider='google'></ProviderSignInButton>
				<ProviderSignInButton provider='discord'></ProviderSignInButton>
			</Container>
		</Modal>
	);
};

export default SignIn;
