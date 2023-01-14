import { v4 } from 'uuid';

import { MessageType } from '@globalTypes/user';

const createEmbedMessage = (data: EmbedData, id: string = v4()): EmbedMessage => {
	return {
		id,
		type: MessageType.EMBED,
		data,
		time: new Date().getTime(),
	};
};

export default createEmbedMessage;
