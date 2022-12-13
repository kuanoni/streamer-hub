import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import React from 'react';

const Videos = () => {
	return <div>Videos</div>;
};

export default Videos;

Videos.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Videos.title = 'Videos';
