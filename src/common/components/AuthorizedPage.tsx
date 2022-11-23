import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentAuth } from 'types/next-auth';

type Props = {
	auth: ComponentAuth;
	children?: React.ReactNode;
};

const AuthorizedPage = ({ auth, children }: Props) => {
	const router = useRouter();
	const { data, status } = useSession({ required: true });

	if (status === 'loading' || !data.user) return <>{auth.loading}</>;

	if (data.user.role !== auth.role) {
		router.push(auth.unauthorized);
		return <>{auth.loading}</>;
	}

	return <>{children}</>;
};

export default AuthorizedPage;
