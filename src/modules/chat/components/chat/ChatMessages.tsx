import { styled } from '../../../../../stiches.config';
import React, { useContext, useMemo, useState } from 'react';
import SocketContext from '../context/SocketContext';
import ChatMessage from './ChatMessage';

const StyledContainer = styled('div', {});

const ChatMessages = () => {
	const socket = useContext(SocketContext);
	const [focusedUser, setFocusedUser] = useState('');

	const focusedUserSelector = 'div[data-username=' + focusedUser + ']';

	const containerFocusedUserCss = useMemo(() => {
		if (focusedUser)
			return {
				[focusedUserSelector]: {
					opacity: '1 !important',
				},
				div: {
					opacity: 0.3,
				},
			};
		else return {};
	}, [focusedUser]);


	return (
		<StyledContainer onClick={handleClick} css={containerFocusedUserCss}>
			{chatMessageList}
		</StyledContainer>
	);
};

export default ChatMessages;
