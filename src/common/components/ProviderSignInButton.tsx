import Image, { StaticImageData } from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';
import { styled } from '../../../stiches.config';
import google from '../../../public/images/providers/small_google.png';

interface Props {
	provider: string;
}

interface ProviderLogos {
	[index: string]: StaticImageData;
}

const Button = styled('button', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	padding: '.5rem 1rem',
	fontSize: '1.25rem',
	lineHeight: 1.5,
	borderStyle: 'none',
	borderRadius: '6px',
	cursor: 'pointer',
	img: {
		width: '1rem',
		height: '1rem',
		marginRight: '1.25rem',
	},
	'&.google': {
		backgroundColor: '#fff',
		borderColor: '#fff',
		color: '#757575',
	},
	'&.google:hover': {
		backgroundColor: '#eee',
		boxShadow: '0 0 3px 3px rgba(66,133,244,.3)',
	},
});

const providerLogos: ProviderLogos = {
	google,
};

const ProviderSignInButton = ({ provider }: Props) => {
	return (
		<Button className={provider} onClick={() => signIn(provider)}>
			<Image src={providerLogos[provider]} alt={provider}></Image>
			{provider.charAt(0).toUpperCase() + provider.slice(1)}
		</Button>
	);
};

export default ProviderSignInButton;
