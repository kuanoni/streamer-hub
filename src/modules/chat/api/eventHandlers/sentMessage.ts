import Joi from 'joi';
import { Socket } from 'socket.io';

import { InfoBadge, Role, SubscriptionTier } from '@globalTypes/user';
import { SocketEvents, SocketRooms } from '@modules/chat/common';

const messageSchema = Joi.object({
	author: Joi.string().min(5).max(15).required(),
	subTier: Joi.string().valid(...Object.values(SubscriptionTier)),
	infoBadges: Joi.array().items(Joi.string().valid(...Object.values(InfoBadge))),
	role: Joi.string().valid(...Object.values(Role)),
	time: Joi.number().required(),
	data: Joi.string().max(500).required(),
});

const sentMessage = (socket: Socket) => (msg: UserMessageToServer, callback: Function, room?: SocketRooms) => {
	if (typeof callback !== 'function') throw new Error("Handler wasn't provided acknowledgement callback");

	const user = socket.user;

	const newMsg: UserMessage = {
		author: user.username,
		time: new Date().getTime(),
		data: msg.data.replace(/\s+/g, ' ').trim(),
	};

	if (user.subscriptionTier) newMsg.subTier = user.subscriptionTier;
	if (user.infoBadges.length) newMsg.infoBadges = user.infoBadges;
	if (user.role) newMsg.role = user.role;

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
