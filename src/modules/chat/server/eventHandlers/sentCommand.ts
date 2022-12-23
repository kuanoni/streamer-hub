import Joi from 'joi';
import { Socket } from 'socket.io';

import { ServerCommand } from '@globalTypes/socketio';
import { MessageType } from '@modules/chat/common';

import sendMessage from '../sendMessage';
import ChatCommand from './commands/ChatCommand';
import cmdBanUser from './commands/cmdBanUser';
import testCommand from './commands/testCommand';

const commands: { [index: string]: ChatCommand } = {
	[testCommand.name]: testCommand,
	[cmdBanUser.name]: cmdBanUser,
};

const commandNames = Object.keys(commands);

const commandSchema = Joi.object({
	author: Joi.string().min(5).max(15).required(),
	name: Joi.string().valid(...commandNames),
	params: Joi.string().allow(''),
});

const sentCommand = (socket: Socket) => async (cmd: ServerCommand) => {
	const { error } = commandSchema.validate(cmd, {
		messages: {
			'any.only': `${cmd.name} is not a valid command.`,
		},
	});

	if (error) {
		sendMessage(socket, MessageType.SERVER, error.message);
		throw error;
	}

	if (!commandNames.includes(cmd.name)) throw new Error(`${cmd.name} was not found in 'commands' object.`);

	const cmdObj = commands[cmd.name];

	if (socket.handshake.auth.authLevel > cmdObj.authLevel)
		return sendMessage(socket, MessageType.SERVER, "You don't have permission to use that command");

	const paramsArr = cmd.params.split(' ');

	const errors = await cmdObj.execute(paramsArr);

	if (errors.length) sendMessage(socket, MessageType.SERVER, errors.join(' '));
};

export default sentCommand;
