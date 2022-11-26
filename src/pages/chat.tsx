import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { ChatBox } from '@/modules/chat/components/chat/ChatBox';
import React from 'react';
import { styled } from 'stiches.config';

const RelativeContainer = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',
});

const StyledContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	height: '100%',
	backgroundColor: '$bgDarker',
});

const StyledIframe = styled('iframe', {
	color: 'transparent',
});

const Chat = () => {
	return (
		<RelativeContainer>
			<StyledContainer>
				<div>
					{/* <StyledIframe
						src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
						width='100%'
						height='100%'
						title='Faker stream'
					/> */}
				</div>
				<ChatBox />
			</StyledContainer>
		</RelativeContainer>
	);
};

export default Chat;

Chat.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
