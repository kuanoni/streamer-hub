import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import React from 'react';

const Admin = () => {
	return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
