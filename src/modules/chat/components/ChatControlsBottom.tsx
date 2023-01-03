import React from 'react';
import { BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import Button from '@components/ui/Button';

import { ChatPopups } from '../common';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingRight: '.5rem',
});

type Props = {
	openPopup: (popup: ChatPopups) => void;
};

const ChatControlsBottom = ({ openPopup }: Props) => {
	return (
		<Container>
			<Button color='dark' content='icon' onClick={() => openPopup(ChatPopups.OPTIONS)}>
				<BsFillGearFill />
			</Button>
			<Button color='dark' content='icon' onClick={() => {}}>
				<BsPeopleFill />
			</Button>
		</Container>
	);
};

export default ChatControlsBottom;
