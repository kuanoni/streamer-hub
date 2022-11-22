import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import React from 'react';

const Chat = () => {
	return <div>Chat</div>;
};

export default Chat;

Chat.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
