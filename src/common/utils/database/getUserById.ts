import clientPromise from '@utils/mongodb';

const getUserById = async (id: string) => {
	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		const userDoc = await collection.findOne({ _id: id });
		return userDoc;
	} catch (err) {
		return false;
	}
};
export default getUserById;
