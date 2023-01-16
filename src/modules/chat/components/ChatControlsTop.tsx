import React, { useContext } from 'react';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import Dropdown from '@components/ui/Dropdown';
import IconButton from '@components/ui/IconButton';
import StreamContext from '@modules/stream/components/context/StreamContext';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem 0',
	backgroundColor: 'transparent',
	'@xs': { [`& ${IconButton.toString()}`]: { display: 'none' } },
});

const ChatControlsTop = () => {
	const ctx = useContext(StreamContext);

	const streamSource = ctx?.isLoaded ? ctx.streamSource : '--------';
	const changeStreamSource = ctx?.isLoaded ? ctx.changeStreamSource : () => {};

	return (
		<Container>
			<Dropdown
				color='dark'
				options={['twitch', 'youtube', 'facebook']}
				value={streamSource}
				chooseOption={changeStreamSource}
			/>
			<IconButton color='dark' onClick={() => {}}>
				<BsArrowUpRightSquareFill />
			</IconButton>
		</Container>
	);
};

export default ChatControlsTop;
