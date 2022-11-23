import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import React from 'react';
import { Page, Role } from 'types/custom-auth';

const Admin: Page = () => {
	return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Admin.authorizationOptions = {
	roleRequired: Role.ADMIN,
	whileLoading: <>Loading...</>,
	unauthorizedRedirect: '/',
};
