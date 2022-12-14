import { AuthPerms } from '@globalTypes/user';

import ChatCommand from './ChatCommand';
import { ExecutionCallback } from './types';

const execCb: ExecutionCallback = async () => {
	return ['Pong!'];
};

const cmdPing = new ChatCommand('ping').setDescription('/ping').setAuthLevel(AuthPerms.USER).setExecCb(execCb);

export default cmdPing;
