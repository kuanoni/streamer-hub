// hack to refetch NextAuth session from db
// https://stackoverflow.com/questions/70405436/next-auth-how-to-update-the-session-client-side
const reloadAuthSession = () => {
	const event = new Event('visibilitychange');
	document.dispatchEvent(event);
};

export default reloadAuthSession;
