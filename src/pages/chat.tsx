import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { ChatBox } from '@/modules/chat/components/chat/ChatBox';
import React from 'react';

const Chat = () => {
	return (
		<div>
			<h1>Chat</h1>
			<ChatBox />
		</div>
	);
};

export default Chat;

Chat.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
