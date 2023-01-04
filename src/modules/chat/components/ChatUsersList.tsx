import { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import { CloseButton, PopupContainer, PopupContent, PopupHeader, PopupSection } from '../styles';
import SocketContext from './context/SocketContext';

const Section = styled(PopupSection, {});

	'&:hover': {
	},
});

interface Props {
	closePopup: () => void;
}

const ChatUsersList = ({ closePopup }: Props) => {
	const ctx = useContext(SocketContext);
	const usersList = ctx?.usersList || [];

	return (
		<PopupContainer>
			<PopupHeader>
				<h2>Users</h2>
				<CloseButton onClick={() => closePopup()}>
					<BsX />
				</CloseButton>
			</PopupHeader>
			<PopupContent>
				<Section>
					{usersList.map((user, i) => (
						<div key={i}>{user.username}</div>
					))}
				</Section>
			</PopupContent>
		</PopupContainer>
	);
};

export default ChatUsersList;
