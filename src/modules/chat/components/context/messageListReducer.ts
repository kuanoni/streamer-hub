import { MessageType } from '@globalTypes/user';

import { DispatchAction, MessageList } from '../../common';

const messageListReducer = (state: MessageList, action: DispatchAction): MessageList => {
	switch (action.type) {
		case 'push': {
			return [...state, action.payload];
		}
		case 'removeLast': {
			return [...state.slice(0, state.length - 1)];
		}
		case 'updateTextMsg': {
			const { id, data }: { id: string; data: string } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);
			const msg = state[msgIndex];

			if (msg.type !== MessageType.TEXT) {
				console.log('err');

				return state;
			}

			const newMsg: UserMessage = { ...msg, data };
			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'updateEmbedMsg': {
			const { id, data }: { id: string; data: EmbedData } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);
			const msg = state[msgIndex];

			if (!msg || msg.type !== MessageType.EMBED) return state;

			const newData = { ...msg.data, ...data };
			const newMsg: EmbedMessage = { ...msg, data: newData };
			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'replaceMsg': {
			const { id, newMsg }: { id: string; newMsg: UserMessage | EmbedMessage } = action.payload;

			const msgIndex = state.findIndex((msg) => msg.id === id);

			return [...state.slice(0, msgIndex), newMsg, ...state.slice(msgIndex + 1)];
		}
		case 'clear':
			return [];
	}

	throw new Error(`Unknown action: ${action}`);
};

export default messageListReducer;
