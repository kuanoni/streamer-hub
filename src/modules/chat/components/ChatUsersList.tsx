import { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import { CloseButton, PopupContainer, PopupContent, PopupHeader, PopupSection } from '../styles';
import SocketContext from './context/SocketContext';

const Section = styled(PopupSection, {});

const Name = styled('span', {
	padding: '0 .25rem',
	borderRadius: theme.space.borderRadHalf,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
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
					{usersList.map((user, i) => {
						console.log(user);

						const color = getUsernameColorsCss(user.role, user.subTier);
						return (
							<div key={user.username}>
								<Name css={color}>{user.username}</Name>
							</div>
						);
					})}
				</Section>
			</PopupContent>
		</PopupContainer>
	);
};

export default ChatUsersList;
