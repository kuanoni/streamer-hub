import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentAuth } from 'types/custom-auth';

type Props = {
	auth: ComponentAuth;
	children?: React.ReactNode;
};

const AuthorizedPage = ({ auth, children }: Props) => {
	const router = useRouter();
	const { data, status } = useSession();

	if (status === 'loading') return <>{auth.loading}</>;

	if (status === 'unauthenticated' || data!.user?.role !== auth.role) {
		router.push(auth.unauthorized);
		return <>{auth.loading}</>;
	}

	return <>{children}</>;
};

export default AuthorizedPage;
