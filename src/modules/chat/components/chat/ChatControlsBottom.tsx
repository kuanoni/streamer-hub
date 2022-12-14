import React, { Dispatch, SetStateAction } from 'react';
import { BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import Button from '@components/ui/Button';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: 'transparent',
});

type Props = {
	setIsChatOptionsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatControlsBottom = ({ setIsChatOptionsOpen }: Props) => {
	return (
		<Container>
			<Button color='dark' content='icon' onClick={() => setIsChatOptionsOpen((current) => !current)}>
				<BsFillGearFill />
			</Button>
			<Button color='dark' content='icon' onClick={() => {}}>
				<BsPeopleFill />
			</Button>
		</Container>
	);
};

export default ChatControlsBottom;
