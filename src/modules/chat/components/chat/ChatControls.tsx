import IconButton from '@/components/new/IconButton';
import React, { FC } from 'react';
import { BsArrowUpRightSquareFill, BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	backgroundColor: 'transparent',
});

const ChatControls: FC = () => {
	return (
		<Container>
			<IconButton onClick={() => {}}>
				<BsFillGearFill />
			</IconButton>
			<IconButton onClick={() => {}}>
				<BsPeopleFill />
			</IconButton>
			<IconButton onClick={() => {}}>
				<BsArrowUpRightSquareFill />
			</IconButton>
		</Container>
	);
};

export default ChatControls;
