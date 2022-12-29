import { randomUUID } from 'crypto';
import Joi from 'joi';
import { Socket } from 'socket.io';

import { InfoBadge, MessageType, Role, SubscriptionTier } from '@globalTypes/user';
import { SocketEvents, SocketRooms } from '@modules/chat/common';

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

	const newMsg: UserMessage = {
		id: randomUUID(),
		type: MessageType.TEXT,
		author: user.username,
		time: new Date().getTime(),
		data: msg.data.replace(/\s+/g, ' ').trim(),
	};

	if (user.subscriptionTier) newMsg.subTier = user.subscriptionTier;
	if (user.infoBadges.length) newMsg.infoBadges = user.infoBadges;
	if (user.role) newMsg.role = user.role;

	const { error, value: validatedMsg } = messageSchema.validate(newMsg);

	if (error) throw error;

	// broadcast message globally or to room
	if (room) socket.in(room).emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);
	else socket.nsp.emit(SocketEvents.CLIENT_RECEIVE_MSG, validatedMsg);

	// write to db
};

export default sentMessage;
