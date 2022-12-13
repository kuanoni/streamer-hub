import React from 'react';
import { styled, theme } from 'stiches.config';

import Modal from './Modal';
import ProviderSignInButton from './ProviderSignInButton';

interface Props {
	isOpen: Boolean;
	close: Function;
}

const Container = styled('div', {
	maxWidth: '500px',
	width: '450px',
	padding: '2rem',
	backgroundColor: theme.colors.bg,
	color: theme.colors.textLight,
	border: `1px solid ${theme.colors.grey500}`,
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
