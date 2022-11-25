import React from 'react';
import Modal from './Modal';
import { styled } from 'stiches.config';
import ProviderSignInButton from './ProviderSignInButton';

interface Props {
	isOpen: Boolean;
	setIsOpen: Function;
}

const Container = styled('div', {
	maxWidth: '500px',
	width: '450px',
	padding: '2rem',
	backgroundColor: '$bg',
	color: '$text',
	'& h1': {
		marginTop: 0,
	},
});

const SignIn = ({ isOpen, setIsOpen }: Props) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Container>
				<h1>Sign In</h1>
				<ProviderSignInButton provider='google'></ProviderSignInButton>
			</Container>
		</Modal>
	);
};

export default SignIn;
