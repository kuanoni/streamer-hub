import add from 'date-fns/add';

import { AuthPerms } from '@globalTypes/user';
import banUser from '@utils/database/banUser';

import ChatCommand from './ChatCommand';
import { ExecutionCallback } from './types';

const durationRegex = /^(\d\w*)([dhm])$/;

const execCb: ExecutionCallback = async (username, duration?, reason?) => {
	let untilDate: Date | undefined = undefined;

	if (duration) {
		const matches = duration.match(durationRegex);
		if (!matches) return ['Invalid "duration" format '];

		const [full, amount, timeInterval] = matches;

		switch (timeInterval) {
			case 'd':
				untilDate = add(new Date(), { days: parseInt(amount) });
			case 'h':
				untilDate = add(new Date(), { hours: parseInt(amount) });
			case 'm':
				untilDate = add(new Date(), { minutes: parseInt(amount) });
		}
	}

	return await banUser(username, untilDate, reason);
};

const cmdBanUser = new ChatCommand('ban')
	.setDescription('/ban [username] (duration)')
	.setAuthLevel(AuthPerms.MOD)
	.setParams([
		{ key: 'username', required: true },
		{ key: 'duration', required: false, regex: durationRegex },
		{ key: 'reason', required: false, rest: true },
	])
	.setExecCb(execCb);

export default cmdBanUser;
