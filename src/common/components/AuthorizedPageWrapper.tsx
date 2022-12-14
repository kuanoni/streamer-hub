import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { PageAuthorizationOptions } from '@globalTypes/authorized-page';

type Props = {
	authorizationOptions: PageAuthorizationOptions;
	children?: React.ReactNode;
};

const AuthorizedPageWrapper = ({ authorizationOptions, children }: Props) => {
	const router = useRouter();
	const { data, status } = useSession();
	const userRole = data?.user?.authLevel;

	const { roleRequired, whileLoading, unauthorizedRedirect } = authorizationOptions;

	if (status === 'loading') return <>{whileLoading}</>;

	if (status === 'unauthenticated' || userRole === undefined || userRole > roleRequired) {
		router.push(unauthorizedRedirect);
		return <>{whileLoading}</>;
	}

	return <>{children}</>;
};

export default AuthorizedPageWrapper;
