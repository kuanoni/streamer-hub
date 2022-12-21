import Joi from 'joi';
import { Socket } from 'socket.io';

import { Rank } from '@globalTypes/custom-auth';
import { ClientMessage, ServerCommand, ServerMessage } from '@globalTypes/socketio';

import { ChatCommands, MessageScope, MessageType, SocketEvents, SocketRooms } from '../common';

const messageSchema = Joi.object({
	type: Joi.number().valid(...Object.values(MessageType)),
	scope: Joi.number().valid(...Object.values(MessageScope)),
	time: Joi.date().required(),
	author: Joi.string().min(5).max(15).required(),
	rank: Joi.string().valid(...Object.values(Rank)),
	text: Joi.string().max(500).required(),
});

const commandSchema = Joi.object({
	author: Joi.string().min(5).max(15).required(),
	command: Joi.string().valid(...Object.keys(ChatCommands)),
	params: Joi.string(),
});

const errorHandler = (handler: Function) => {
	const handleError = (err: Error) => {
		console.error(err);
	};

	return (...args: any[]) => {
		try {
			const handlerReturn = handler(...args);

			// async handler
			if (handlerReturn && typeof handlerReturn.catch === 'function') {
				handlerReturn.catch((err: Error) => handleError(err));
			}
		} catch (err: any) {
			// sync handler
			handleError(err);
		}
	};
};

export const messageHandler = async (socket: Socket) => {
	const sentMessage = (msg: ServerMessage, callback: Function, room?: SocketRooms) => {
		if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

		const newMsg: ClientMessage = {
			...msg,
			scope: MessageScope.PUBLIC,
			type: MessageType.DEFAULT,
			time: new Date().toISOString(),
			text: msg.text.replace(/\s+/g, ' ').trim(),
		};

		const { error, value: validatedMsg } = messageSchema.validate(newMsg);

		if (error) {
			callback({
				ok: false,
				errors: error.details,
			});
			throw error;
		}

		// broadcast message globally or to room
		if (room) socket.in(room).emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);
		else socket.nsp.emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);

		// write to db

		callback({
			ok: true,
		});
	};

	const sentCommand = (cmd: ServerCommand, callback: Function) => {
		if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

		const { error, value: validatedMsg } = commandSchema.validate(cmd, {
			messages: {
				'any.only': `${cmd.command} is not a valid command.`,
			},
		});

		if (error) {
			callback({
				ok: false,
				error: error.message,
			});
			throw error;
		}

		const paramsArr = cmd.params.split(' ');

		callback({
			ok: true,
		});
	};

	// find some way to persist an array of messages on the server side
	// add new messages to it and then emit it to clients

	socket.on(SocketEvents.CLIENT_SEND_MSG, errorHandler(sentMessage));
	socket.on(SocketEvents.CLIENT_SEND_COMMAND, errorHandler(sentCommand));
};

export const connectionHandler = async (socket: Socket) => {
	socket.emit(SocketEvents.CLIENT_RECEIVE_MSG, {
		scope: MessageScope.CLIENT,
		type: MessageType.INFO,
		time: new Date(),
		author: 'INFO',
		text: 'You have connected.',
	});
};
