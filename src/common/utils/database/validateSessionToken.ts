import clientPromise from '@utils/mongodb';

const validateSessionToken = async (sessionToken: string) => {
	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('sessions');

		const session = await collection.findOne<{ userId: string }>({ sessionToken });
		if (session) return session;
		else return false;
	} catch (err) {
		return false;
	}
};
export default validateSessionToken;
