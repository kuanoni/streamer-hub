import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '@utils/mongodb';

const usernameSchema = Joi.string().min(5).max(15).alphanum().required();

const checkUsername = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') return res.json({ status: 500, message: 'Request must be GET' });
	if (!req.query.username) return res.json({ status: 500, message: 'Request query "username" missing' });
	const username = req.query.username;

	// validate username with JOI
	const { value, error } = usernameSchema.validate(username, {
		abortEarly: false,
		messages: {
			'string.min': `Has too few characters ${username.length}/5`,
			'string.max': `Has too many characters ${username.length}/15`,
			'string.alphanum': `Contains special characters or spaces`,
		},
	});

	if (error)
		return res.json({
			status: 200,
			available: false,
			validationErrors: error.details.map((detail) => detail.message),
		});

	// check username for bad words and such

	// check if username is already taken
	try {
		const client = await clientPromise;
		const db = client.db('auth');
		const collection = db.collection('users');

		const docByDisplayName = await collection.findOne({ username });

		if (docByDisplayName)
			return res.json({ status: 200, available: false, validationErrors: ['Is already taken'] });
		else return res.json({ status: 200, available: true, validationErrors: ['Is available!'] });
	} catch (err) {
		res.json({ status: 500, message: err });
	}
};

export default checkUsername;
