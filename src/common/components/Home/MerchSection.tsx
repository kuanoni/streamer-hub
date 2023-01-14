import Image from 'next/image';
import { styled, theme } from 'stiches.config';

import mug from '@images/mug.png';
import tshirt from '@images/tshirt.png';
import { CSS } from '@stitches/react';

import Section from './Section';

const contentCss: CSS = {
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 1fr)',
	gridTemplateRows: '1fr',
	gap: '1rem',
	padding: '.5rem .25rem',
	overflowX: 'auto',
};

const MerchImage = styled(Image, {
	width: '100%',
	transformOrigin: 'top',
	transition: '.1s ease-in',
	'@lg': {},
});

const MerchLabel = styled('span', {
	minHeight: '1.5rem',
	color: theme.colors.textLight,
	transition: 'transform .1s ease',
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
	'@lg': {
		[`&:hover ${MerchImage}`]: {
			transform: 'scale(.8)',
		},
	},
});

const MerchItem = styled('div', {
	aspectRatio: 1,
	overflow: 'hidden',
	'@lg': {},
});

const MerchSection = () => {
	return (
		<Section>
			<Section.Header>Merch</Section.Header>
			<Section.Content css={contentCss}>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
						<MerchLabel>T-Shirt $35</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
						<MerchLabel>Mug $15</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
						<MerchLabel>T-Shirt $35</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
						<MerchLabel>Mug $15</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
						<MerchLabel>T-Shirt $35</MerchLabel>
					</MerchLink>
				</MerchItem>
				<MerchItem>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
						<MerchLabel>Mug $15</MerchLabel>
					</MerchLink>
				</MerchItem>
			</Section.Content>
		</Section>
	);
};

export default MerchSection;
