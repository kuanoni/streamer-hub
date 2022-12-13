import clientPromise from '@utils/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const userSetDisplayName = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PATCH') return res.json({ status: 500, message: 'Request must be PATCH.' });

	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		if (!req.body) return res.json({ status: 500, message: 'No request body.' });
		const { _id, displayName } = JSON.parse(req.body);

		const docByDisplayName = await collection.findOne({ displayName });
		if (docByDisplayName) return res.json({ status: 500, message: 'Display name is already taken.' });

		const docById = await collection.findOne({ _id: new ObjectId(_id) });
		if (!docById) return res.json({ status: 500, message: 'Invalid user id.' });
		if (docById.displayName) return res.json({ status: 500, message: 'Display name has already been set.' });

		const updated = await collection.updateOne(
			{ _id: new ObjectId(_id) },
			{
				$set: { displayName },
			}
		);

		res.json({ status: 200, message: 'Display name set successfully.' });
	} catch (err) {
		res.json({ status: 500, message: err });
	}
};

export default userSetDisplayName;
