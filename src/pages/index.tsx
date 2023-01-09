import { styled } from 'stiches.config';

import MerchSection from '@components/Home/MerchSection';
import Section from '@components/Home/Section';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	marginTop: '1rem',
});

const Row = styled('div', {
	display: 'flex',
	gap: '1rem',
	justifyContent: 'stretch',
});

export default function Home() {
	return (
		<Container>
			<MerchSection />
			<Row>
				<Section>
					<Section.Header>Twitter</Section.Header>
					<Section.Content>content</Section.Content>
				</Section>
				<Section>
					<Section.Header>Reddit</Section.Header>
					<Section.Content>content</Section.Content>
				</Section>
			</Row>
			<Section>
				<Section.Header>Videos</Section.Header>
				<Section.Content>content</Section.Content>
			</Section>
		</Container>
	);
}

Home.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Home.title = 'Home';
