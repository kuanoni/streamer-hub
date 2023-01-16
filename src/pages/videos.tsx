import { styled, theme } from 'stiches.config';

import LayoutWithNavbar from '@layouts/LayoutWithNavbar';

const Container = styled('div', {});

interface Props {}

const Videos = ({}: Props) => {
	return (
		<Container>
			<h1>Under construction...</h1>
		</Container>
	);
};

export default Videos;

Videos.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Videos.title = 'Videos';
