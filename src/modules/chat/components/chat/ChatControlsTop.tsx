import React, { FC, useContext, useEffect, useState } from 'react';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import IconButton from '@components/new/IconButton';
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
			<IconButton onClick={() => {}}>
				<BsArrowUpRightSquareFill />
			</IconButton>
		</Container>
	);
};

export default ChatControlsTop;
