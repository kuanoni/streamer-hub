import { useSession } from 'next-auth/react';

const AuthorizedPage = ({ children }) => {
	const { status } = useSession({ required: true });

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return children;
};

export default AuthorizedPage;
