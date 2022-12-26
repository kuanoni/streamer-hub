import Joi from 'joi';
import { User } from 'next-auth';
import { Socket } from 'socket.io';

import { Role } from '@globalTypes/custom-auth';
import { UserMessage, UserMessageToServer } from '@globalTypes/socketio';
import { SocketEvents, SocketRooms, UserFlair } from '@modules/chat/common';

const messageSchema = Joi.object({
	author: Joi.string().min(5).max(15).required(),
	flair: Joi.string().valid(...Object.values(UserFlair)),
	time: Joi.date().required(),
	data: Joi.string().max(500).required(),
});

const sentMessage = (socket: Socket) => (msg: UserMessageToServer, callback: Function, room?: SocketRooms) => {
	if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

	const user = socket.user;

	const newMsg: UserMessage = {
		author: user.username,
		flair: user.selectedFlair,
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
