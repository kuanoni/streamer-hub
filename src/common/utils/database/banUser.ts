import add from 'date-fns/add';

import clientPromise from '@utils/mongodb';

const banUser = async (username: string, untilDate?: Date, reason?: string) => {
	if (!untilDate) untilDate = add(new Date(), { days: 2 });
	if (!reason) reason = '';

	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		const docByDisplayName = await collection.findOne({ username });

		console.log('user doc:', docByDisplayName, untilDate);
		if (!docByDisplayName) return [`User "${username}" not found`];

		return [];
	} catch (err) {
		return [];
	}
};
export default banUser;
