import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import React from 'react';
import { Role } from 'types/next-auth';

const Admin = () => {
	return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Admin.auth = {
	role: Role.ADMIN,
	loading: <>Loading...</>,
	unauthorized: '/',
};
