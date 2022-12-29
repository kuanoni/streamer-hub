import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { BsDashCircleFill, BsFillGearFill, BsPeopleFill } from 'react-icons/bs';
import { styled } from 'stiches.config';

import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import { MessageType } from '@globalTypes/user';

import SocketContext from './context/SocketContext';

const Container = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingRight: '.5rem',
});

type Props = {
	setIsChatOptionsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatControlsBottom = ({ setIsChatOptionsOpen }: Props) => {
	const ctx = useContext(SocketContext);
	const [input, setInput] = useState('');

	return (
		<Container>
			<Button color='dark' content='icon' onClick={() => setIsChatOptionsOpen((current) => !current)}>
				<BsFillGearFill />
			</Button>
			<Button
				color='dark'
				content='icon'
				onClick={() =>
					ctx?.dispatch({
						type: 'updateTextMsg',
						payload: { id: input, data: new Date().toISOString() },
					})
				}
			>
				<BsDashCircleFill />
			</Button>
			<TextInput value={input} setValue={setInput} placeholder='...' />
			<Button color='dark' content='icon' onClick={() => {}}>
				<BsPeopleFill />
			</Button>
		</Container>
	);
};

export default ChatControlsBottom;
