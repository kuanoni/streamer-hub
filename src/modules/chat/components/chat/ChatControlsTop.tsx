import IconButton from '@components/new/IconButton';
import StreamContext from '@modules/stream/components/context/StreamContext';
import StreamEmbedSelector from '@modules/stream/components/StreamEmbedSelector';
import React, { FC, useContext } from 'react';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem 0',
	backgroundColor: 'transparent',
});

const ChatControlsTop: FC = () => {
	const ctx = useContext(StreamContext);

	return (
		<Container>
			<StreamEmbedSelector streamSource={ctx?.streamSource || 'twitch'} setStreamSource={ctx?.setStreamSource} />
			<IconButton onClick={() => {}}>
				<BsArrowUpRightSquareFill />
			</IconButton>
		</Container>
	);
};

export default ChatControlsTop;
