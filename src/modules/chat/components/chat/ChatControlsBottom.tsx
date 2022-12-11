import IconButton from '@/components/new/IconButton';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	backgroundColor: 'transparent',
});

type Props = {
	setIsChatOptionsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatControlsBottom = ({ setIsChatOptionsOpen }: Props) => {
	return (
		<Container>
			<IconButton onClick={() => setIsChatOptionsOpen((current) => !current)}>
				<BsFillGearFill />
			</IconButton>
			<IconButton onClick={() => {}}>
				<BsPeopleFill />
			</IconButton>
		</Container>
	);
};

export default ChatControlsBottom;
