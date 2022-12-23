import add from 'date-fns/add';

import { AuthPerms } from '@globalTypes/custom-auth';
import banUser from '@utils/database/banUser';

import ChatCommand from './ChatCommand';
import { ExecutionCallback } from './types';

const durationRegex = /^(\d\w*)([dhm])$/;

const execCb: ExecutionCallback = async (username, duration?) => {
	if (duration) {
		const matches = duration.match(durationRegex);
		if (!matches) return ['Invalid "duration" format '];

		const [full, amount, timeInterval] = matches;

		switch (timeInterval) {
			case 'd':
				return await banUser(username, add(new Date(), { days: parseInt(amount) }));
			case 'h':
				return await banUser(username, add(new Date(), { hours: parseInt(amount) }));
			case 'm':
				return await banUser(username, add(new Date(), { minutes: parseInt(amount) }));
		}
	}

	return await banUser(username);
};

const cmdBanUser = new ChatCommand('ban')
	.setDescription('/ban [username] (duration)')
	.setAuthLevel(AuthPerms.MOD)
	.setParams([
		{ key: 'username', required: true },
		{ key: 'duration', required: false, regex: durationRegex },
	])
	.setExecCb(execCb);

export default cmdBanUser;
