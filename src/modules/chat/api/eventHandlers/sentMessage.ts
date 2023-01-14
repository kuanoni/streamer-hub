import Joi from 'joi';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';

import { InfoBadge, MessageType, Role, SubscriptionTier } from '@globalTypes/user';
import { EmbedColors, SocketEvents, SocketRooms } from '@modules/chat/common';
import parseCommandText from '@modules/chat/utils/parseCommandText';

import serverSendEmbedMsg from '../serverSendEmbedMsg';
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

const messageSchema = Joi.object({
	id: Joi.string().uuid().required(),
	type: Joi.number()
		.valid(...Object.values(MessageType))
		.required(),
	author: Joi.string().min(5).max(15).required(),
	subTier: Joi.string().valid(...Object.values(SubscriptionTier)),
	infoBadges: Joi.array().items(Joi.string().valid(...Object.values(InfoBadge))),
	role: Joi.string().valid(...Object.values(Role)),
	time: Joi.number().required(),
	data: Joi.string().max(500).required(),
});

const sentMessage = (socket: Socket) => (msg: UserMessageToServer, room?: SocketRooms) => {
	const user = socket.user;

	const handleCommand = async (msg: UserMessageToServer) => {
		const cmd: CommandMessage = parseCommandText(msg.data);

		// validate command message
		const { error, value } = commandSchema.validate(cmd, {
			messages: {
				'any.only': `"${cmd.name}" is not a valid command.`,
			},
		});

		const { name, params } = value;

		if (error) {
			serverSendEmbedMsg(socket, { title: 'Error', description: error.message, color: EmbedColors.error });
			throw error;
		}

		// if this error is thrown, something is very wrong. it should be caught by the Joi validator
		if (!commandNames.includes(name)) throw new Error(`${name} was not found in 'commands' object.`);

		const cmdObj = commands[name];

		// make sure socket has the required authLevel
		if (user.authLevel < cmdObj.authLevel)
			// return serverSendTextMsg(socket, "You don't have permission to use that command");
			return serverSendEmbedMsg(socket, {
				title: 'Error',
				description: "You don't have permission to use that command",
				color: EmbedColors.error,
			});

		const paramsArr = params.split(' ');

		// this will return an empty array on success and an array with error messages (strings) on failure
		const errors = await cmdObj.execute(paramsArr);

		// if (errors.length) serverSendTextMsg(socket, errors.join(' '));
		if (errors.length)
			serverSendEmbedMsg(socket, { title: 'Error', description: errors.join(' '), color: EmbedColors.error });
	};

	const handleText = (msg: UserMessageToServer) => {
		const newMsg: UserMessage = {
			id: v4(),
			type: MessageType.TEXT,
			author: user.username,
			time: new Date().getTime(),
			data: msg.data.replace(/\s+/g, ' ').trim(),
		};

		const { error, value: validatedMsg } = messageSchema.validate(newMsg);

		if (error) throw error;

		// add user properties to message
		if (user.subscriptionTier) validatedMsg.subTier = user.subscriptionTier;
		if (user.infoBadges.length) validatedMsg.infoBadges = user.infoBadges;
		if (user.role) validatedMsg.role = user.role;

		// broadcast message globally or to room
		if (room) socket.in(room).emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);
		else socket.nsp.emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);

		// write to db
	};

	if (msg.data.startsWith('/')) handleCommand(msg);
	else handleText(msg);
};

export default sentMessage;
