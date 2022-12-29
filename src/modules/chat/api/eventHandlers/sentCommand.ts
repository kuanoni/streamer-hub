import Joi from 'joi';
import { Socket } from 'socket.io';

import serverSendEmbedMsg from '../serverSendEmbedMsg';
import serverSendTextMsg from '../serverSendTextMsg';
import ChatCommand from './commands/ChatCommand';
import cmdBanUser from './commands/cmdBanUser';
import cmdPing from './commands/cmdPing';

const commands: { [index: string]: ChatCommand } = {
	[cmdPing.name]: cmdPing,
	[cmdBanUser.name]: cmdBanUser,
};

const commandNames = Object.keys(commands);

const commandSchema = Joi.object({
	name: Joi.string().valid(...commandNames),
	params: Joi.string().allow(''),
});

const sentCommand = (socket: Socket) => async (cmd: CommandMessage) => {
	// validate command message
	const { error } = commandSchema.validate(cmd, {
		messages: {
			'any.only': `${cmd.name} is not a valid command.`,
		},
	});

	if (error) {
		// serverSendTextMsg(socket, error.message);
		serverSendEmbedMsg(socket, { title: 'Error', description: error.message });
		throw error;
	}

	// if this error is thrown, something is very wrong. it should be caught by the Joi validator
	if (!commandNames.includes(cmd.name)) throw new Error(`${cmd.name} was not found in 'commands' object.`);

	const cmdObj = commands[cmd.name];

	// make sure socket has the required authLevel
	if (socket.handshake.auth.authLevel < cmdObj.authLevel)
		// return serverSendTextMsg(socket, "You don't have permission to use that command");
		return serverSendEmbedMsg(socket, {
			title: 'Error',
			description: "You don't have permission to use that command",
		});

	const paramsArr = cmd.params.split(' ');

	// this will return an empty array on success and an array with error messages (strings) on failure
	const errors = await cmdObj.execute(paramsArr);

	// if (errors.length) serverSendTextMsg(socket, errors.join(' '));
	if (errors.length) serverSendEmbedMsg(socket, { title: 'Error', description: errors.join(' ') });
};

export default sentCommand;