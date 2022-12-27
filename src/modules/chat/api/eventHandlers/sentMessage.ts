import Joi from 'joi';
import { Socket } from 'socket.io';

import { UsernameFlair } from '@globalTypes/user';
import { SocketEvents, SocketRooms } from '@modules/chat/common';

const messageSchema = Joi.object({
	author: Joi.string().min(5).max(15).required(),
	flair: Joi.string().valid(...Object.values(UsernameFlair)),
	time: Joi.date().required(),
	data: Joi.string().max(500).required(),
});

const sentMessage = (socket: Socket) => (msg: UserMessageToServer, callback: Function, room?: SocketRooms) => {
	if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

	const user = socket.user;

	const newMsg: UserMessage = {
		author: user.username,
		flair: '',
		time: new Date().toISOString(),
		data: msg.data.replace(/\s+/g, ' ').trim(),
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

export default sentMessage;
