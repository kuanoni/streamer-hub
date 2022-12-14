import React, { FC, useContext, useEffect, useState } from 'react';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import Button from '@components/ui/Button';
import Dropdown from '@components/ui/Dropdown';
import StreamContext, { StreamSource } from '@modules/stream/components/context/StreamContext';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem 0',
	backgroundColor: 'transparent',
});

const ChatControlsTop: FC = () => {
	const ctx = useContext(StreamContext);
	const [streamEmbedSource, setStreamEmbedSource] = useState<StreamSource>(ctx?.streamSource || 'facebook');

	useEffect(() => {
		if (ctx?.streamSource !== streamEmbedSource) ctx?.setStreamSource(streamEmbedSource);
	}, [ctx?.streamSource, ctx?.setStreamSource, streamEmbedSource]);

	return (
		<Container>
			<Dropdown
				color='dark'
				options={['twitch', 'youtube', 'facebook']}
				value={streamEmbedSource}
				chooseOption={setStreamEmbedSource}
			/>
			<Button color='dark' content='icon' onClick={() => {}}>
				<BsArrowUpRightSquareFill />
			</Button>
		</Container>
	);
};

export default ChatControlsTop;
