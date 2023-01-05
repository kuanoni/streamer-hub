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
	togglePopup: (popup: ChatPopups) => void;
};

const ChatControlsBottom = ({ togglePopup }: Props) => {
	return (
		<Container>
			<Button color='dark' content='icon' onClick={() => togglePopup(ChatPopups.OPTIONS)}>
				<BsFillGearFill />
			</Button>
			<Button color='dark' content='icon' onClick={() => togglePopup(ChatPopups.USERS)}>
				<BsPeopleFill />
			</Button>
		</Container>
	);
};

export default ChatControlsBottom;
