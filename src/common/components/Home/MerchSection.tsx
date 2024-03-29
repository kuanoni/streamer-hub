import Image from 'next/image';
import { styled, theme } from 'stiches.config';

import hat from '@images/shop/hat.png';
import mask from '@images/shop/mask.png';
import sweatshirt from '@images/shop/sweatshirt.png';
import tanktop from '@images/shop/tanktop.png';
import tshirt from '@images/shop/tshirt.png';
import tshirt2 from '@images/shop/tshirt2.png';
import { CSS } from '@stitches/react';

import Section from '../Section';

const contentCss: CSS = {
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 1fr)',
	gridTemplateRows: '1fr',
	gap: '1rem',
	padding: '.5rem .25rem',
	overflowX: 'auto',
	'@xs': {
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateRows: '1fr 1fr',
	},
	'@xxs': {
		gridTemplateColumns: '1fr 1fr',
		gridTemplateRows: '1fr 1fr 1fr',
	},
};

const MerchImage = styled(Image, {
	width: '100%',
	transformOrigin: 'top',
	transition: '.1s ease-in',
});

const MerchLabel = styled('span', {
	minHeight: '1.5rem',
	color: theme.colors.textLight,
	whiteSpace: 'nowrap',
	transition: 'transform .1s ease',
	'@sm': { fontSize: '.8rem', minHeight: '1rem' },
	'@xs': { fontSize: '1rem', minHeight: '1.5rem' },
});

const MerchLink = styled('a', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	height: '100%',
	cursor: 'pointer',
	'&:hover': {
		textDecoration: 'none',
	},
	[`&:hover ${MerchLabel}`]: {
		transform: 'translateY(-100%)',
	},
	[`&:hover ${MerchImage}`]: {
		transform: 'scale(.87)',
		filter: `drop-shadow(0 0 5px ${theme.colors.primary200})`,
	},
	[`&:active ${MerchImage}`]: {
		transitionDuration: '0s',
		transform: 'scale(.87) rotateX(15deg)',
	},
	'@md': {
		[`&:hover ${MerchImage}`]: {
			transform: 'scale(.8)',
		},
	},
});

const MerchItem = styled('div', {
	aspectRatio: 1,
	overflow: 'hidden',
});

const MerchSection = () => {
	return (
		<Section>
			<Section.Header>Merch</Section.Header>
			<Section.Content css={contentCss}>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={hat} alt='hat' />
						<MerchLabel>Hat $15</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={sweatshirt} alt='sweatshirt' />
						<MerchLabel>Sweatshirt $35</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
						<MerchLabel>T-Shirt $20</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tshirt2} alt='tshirt' />
						<MerchLabel>T-Shirt $20</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tanktop} alt='tanktop' />
						<MerchLabel>Tanktop $15</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={mask} alt='mask' />
						<MerchLabel>Mask $10</MerchLabel>
					</MerchLink>
				</MerchItem>
			</Section.Content>
		</Section>
	);
};

export default MerchSection;
