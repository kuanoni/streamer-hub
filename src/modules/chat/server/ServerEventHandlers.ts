import { Socket } from 'socket.io';
import { Message } from 'types/socketio';
import Joi from 'joi';
import { MessageType, SocketRooms } from '../common';

const messageSchema = Joi.object({
	type: Joi.number().valid(...Object.values(MessageType)),
	time: Joi.date().required(),
	author: Joi.string().max(25).required(),
	text: Joi.string().max(500).required(),
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
	const createdMessage = (
		msg: Message,
		callback: Function,
		room?: SocketRooms,
		type: MessageType = MessageType.PUBLIC
	) => {
		if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

		msg.type = type;
		msg.time = new Date().toISOString();
		msg.text = msg.text.replace(/\s+/g, ' ').trim();

		const { error, value } = messageSchema.validate(msg);

		if (error) {
			callback();
			throw error;
		}

		if (room) socket.in(room).emit('incomingMessage', value);
		else socket.nsp.emit('incomingMessage', value);
		// write to db

		callback({
			status: 'OK',
		});
	};

	// find some way to persist an array of messages on the server side
	// add new messages to it and then emit it to clients

	socket.on('createdMessage', errorHandler(createdMessage));
};
