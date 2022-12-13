import React from 'react';

import { AuthPerms, Page } from '@globalTypes/custom-auth';
import LayoutWithNavbar from '@layouts/LayoutWithNavbar';

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
