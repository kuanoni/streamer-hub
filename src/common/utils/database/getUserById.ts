import { User } from 'next-auth';

import clientPromise from '@utils/mongodb';

// find user in db and return data
const getUserById = async (id: string) => {
	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		const userData = await collection.findOne<User>({ _id: id });
		return userData;
	} catch (err) {
		return null;
	}
};
export default getUserById;
