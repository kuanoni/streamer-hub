import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { ChatBox } from '@/modules/chat/components/chat/ChatBox';
import React from 'react';
import { styled } from 'stiches.config';

const StyledContainer = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	height: '100%',
});

const Chat = () => {
	return (
		<StyledContainer>
			<div></div>
			<ChatBox />
		</StyledContainer>
	);
};

export default Chat;

Chat.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
