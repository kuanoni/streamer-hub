import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { Role } from '@globalTypes/user';
import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import { UsersList, UsersListItem } from '../common';
import { CloseButton, PopupContainer, PopupContent, PopupHeader, PopupSection } from '../styles';
import SocketContext from './context/SocketContext';

const Section = styled(PopupSection, {});

const NameContainer = styled('div', {
	marginBottom: 2,
});

const Name = styled('span', {
	padding: '0 .25rem',
	borderRadius: theme.space.borderRadHalf,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
});

type RoleUsersListItem = UsersListItem & { role: Role };

interface Props {
	closePopup: () => void;
}

const ChatUsersList = ({ closePopup }: Props) => {
	const ctx = useContext(SocketContext);
	const [usersListSections, setUsersListSections] = useState<UsersList[]>([]);
	const mountedRef = useRef<boolean>(false);

	useEffect(() => {
		if (mountedRef.current || !ctx?.usersList) return;
		const usersList = ctx.usersList;

		const otherUsers: UsersList = [];
		const roleUsers: RoleUsersListItem[] = [];

		// split users list
		for (const user of usersList) {
			if (user.role) roleUsers.push(user as RoleUsersListItem);
			else otherUsers.push(user);
		}

		// sort lists
		otherUsers.sort((a, b) => a.username.localeCompare(b.username));
		roleUsers.sort((a, b) => {
			return a.role.localeCompare(b.role) || a.username.localeCompare(b.username);
		});

		setUsersListSections([roleUsers, otherUsers]);
	}, [ctx?.usersList]);

	const sectionComponents = useMemo(
		() =>
			usersListSections.map((sectionUsers, i) => {
				return (
					<Section key={i}>
						{sectionUsers.map((user) => {
							const color = getUsernameColorsCss(user.role, user.subTier);
							return (
								<NameContainer key={user.username}>
									<Name css={color}>{user.username}</Name>
								</NameContainer>
							);
						})}
					</Section>
				);
			}),
		[usersListSections]
	);

	// used to prevent
	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return (
		<PopupContainer>
			<PopupHeader>
				<h2>Users</h2>
				<CloseButton onClick={() => closePopup()}>
					<BsX />
				</CloseButton>
			</PopupHeader>
			<PopupContent>{sectionComponents}</PopupContent>
		</PopupContainer>
	);
};

export default ChatUsersList;
