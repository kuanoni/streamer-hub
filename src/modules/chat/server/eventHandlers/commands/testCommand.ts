import ChatCommand from './ChatCommand';
import { ExecutionCallback } from './types';

const execCb: ExecutionCallback = (username, razor?) => {
	console.log('executing', username, razor);
	return [];
};

const test = new ChatCommand('test')
	.setDescription('/test [username] (razor)')
	.setParams([
		{ key: 'username', required: true },
		{ key: 'razor', required: false },
	])
	.setExecCb(execCb);

export default test;
