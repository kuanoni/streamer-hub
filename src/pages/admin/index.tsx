import LayoutWithNavbar from '@layouts/LayoutWithNavbar';
import React from 'react';
import { Page, AuthPerms } from '@types/custom-auth';

const Admin: Page = () => {
	return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Admin.authorizationOptions = {
	roleRequired: AuthPerms.ADMIN,
	whileLoading: <>Loading...</>,
	unauthorizedRedirect: '/',
};
