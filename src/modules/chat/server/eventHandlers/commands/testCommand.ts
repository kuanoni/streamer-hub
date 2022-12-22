import CommandBuilder from './CommandBuilder';
import { CommandParam } from './types';

const params: CommandParam[] = [
	{ key: 'username', required: true },
	{ key: 'razor', required: false },
];

const execCb = ({ username, razor }: { username: string; razor?: string }) => {
	console.log('executing', username, razor);
};

const test = new CommandBuilder('test')
	.setDescription('Returns a users email: /test [username] (razor)')
	.setParams(params)
	.setExecCb(execCb);

export default test;
