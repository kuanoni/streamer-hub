import React, { useContext, useEffect, useRef, useState } from 'react';
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
type RoleUsersList = RoleUsersListItem[];

interface Props {
	closePopup: () => void;
}

const ChatUsersList = ({ closePopup }: Props) => {
	const ctx = useContext(SocketContext);
	const [usersListSections, setUsersListSections] = useState<UsersList[]>([]);
	const isMountedRef = useRef<boolean>(false);

	// divides context usersLists into separate sorted arrays of users with roles, and users without roles
	// only runs once then stops after component is mounted
	useEffect(() => {
		if (isMountedRef.current || !ctx?.usersList) return;

		const usersList = ctx.usersList;
		const roleUsers: RoleUsersList = [];
		const rolelessUsers: UsersList = [];

		// split users list into users with roles and users without roles
		for (const user of usersList) {
			if (user.role) roleUsers.push(user as RoleUsersListItem);
			else rolelessUsers.push(user);
		}

		// sort both lists
		roleUsers.sort((a, b) => a.role.localeCompare(b.role) || a.username.localeCompare(b.username));
		rolelessUsers.sort((a, b) => a.username.localeCompare(b.username));

		setUsersListSections([roleUsers, rolelessUsers]);
	}, [ctx?.usersList]);

	// track if component is mounted
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	return (
		<PopupContainer>
			<PopupHeader>
				<div>
					<h2>Users</h2>
					<span> ({ctx?.usersList.length})</span>
				</div>
				<CloseButton onClick={() => closePopup()}>
					<BsX />
				</CloseButton>
			</PopupHeader>
			<PopupContent>
				{usersListSections.map((sectionUsers, i) => {
					if (!sectionUsers.length) return <React.Fragment key={i}></React.Fragment>;

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
				})}
			</PopupContent>
		</PopupContainer>
	);
};

export default ChatUsersList;
