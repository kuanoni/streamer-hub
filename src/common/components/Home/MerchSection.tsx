import Image from 'next/image';
import { styled } from 'stiches.config';

import mug from '@images/mug.png';
import tshirt from '@images/tshirt.png';

import Section from './Section';

const Container = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 1fr)',
	gridTemplateRows: '1fr',
	gap: '1rem',
});

const MerchImage = styled(Image, {
	width: '100%',
	height: '100%',
	objectFit: 'contain',
});
const MerchLink = styled('a', {
	cursor: 'pointer',
});

const MerchSection = () => {
	return (
		<Section>
			<Section.Header>Merch</Section.Header>
			<Section.Content>
				<Container>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
					</MerchLink>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
					</MerchLink>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
					</MerchLink>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
					</MerchLink>
					<MerchLink href='#'>
						<MerchImage src={tshirt} alt='tshirt' />
					</MerchLink>
					<MerchLink href='#'>
						<MerchImage src={mug} alt='tshirt' />
					</MerchLink>
				</Container>
			</Section.Content>
		</Section>
	);
};

export default MerchSection;
