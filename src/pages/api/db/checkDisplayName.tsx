import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '@utils/mongodb';

const displayNameSchema = Joi.string().min(5).max(15).token().required();

const checkDisplayName = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') return res.json({ status: 500, message: 'Request must be GET.' });
	if (!req.query.displayName) return res.json({ status: 500, message: 'Request query "displayName" missing.' });
	const displayName = (req.query.displayName as string).trim();

	// validate displayName
	const { value, error } = displayNameSchema.validate(displayName, {
		abortEarly: false,
		messages: {
			'string.min': `Has too few characters`,
			'string.max': `Has too many characters`,
			'string.token': `Contains special characters`,
		},
	});

	if (error)
		return res.json({
			status: 200,
			available: false,
			validationErrors: error.details.map((detail) => detail.message),
		});

	// check displayName for bad words and such

	// check if displayName is already taken
	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		const docByDisplayName = await collection.findOne({ displayName });

		if (docByDisplayName)
			return res.json({ status: 200, available: false, validationErrors: ['Username is already taken'] });
		else return res.json({ status: 200, available: true, validationErrors: [] });
	} catch (err) {
		res.json({ status: 500, message: err });
	}
	res.json({ success: false, message: 'Display name checked' });
};

export default checkDisplayName;