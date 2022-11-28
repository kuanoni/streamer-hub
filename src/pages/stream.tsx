import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';
import { Chat } from '@/modules/chat/components/chat/Chat';
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

const Stream = () => {
	return (
		<RelativeContainer>
			<StyledContainer>
				<div>
					<StyledIframe
						src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
						width='100%'
						height='100%'
						title='Faker stream'
					/>
				</div>
				<Chat />
			</StyledContainer>
		</RelativeContainer>
	);
};

export default Stream;

Stream.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};
