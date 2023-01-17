import React from 'react';
import { BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import IconButton from '@components/ui/IconButton';

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
			<IconButton color='dark' onClick={() => togglePopup(ChatPopups.OPTIONS)}>
				<BsFillGearFill />
			</IconButton>
			<IconButton color='dark' onClick={() => togglePopup(ChatPopups.USERS)}>
				<BsPeopleFill />
			</IconButton>
		</Container>
	);
};

export default ChatControlsBottom;
