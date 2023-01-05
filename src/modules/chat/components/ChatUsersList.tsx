import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsArrowClockwise, BsSearch, BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import TextInput from '@components/ui/TextInput';
import { Role } from '@globalTypes/user';
import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import { UsersList, UsersListItem } from '../common';
import {
	HeaderButton, PopupContainer, PopupContent, PopupContentHeader, PopupHeader, PopupHeaderButtons,
	PopupHeaderTitle, PopupSection
} from '../styles';
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
	const [searchValue, setSearchValue] = useState('');
	const [, forceRender] = useState({});

	const isListFrozenRef = useRef<boolean>(false);
	const isListFrozen = isListFrozenRef?.current;

	// divides context usersLists into separate sorted arrays of users with roles, and users without roles
	// only runs once then stops after component is mounted
	useEffect(() => {
		if (isListFrozenRef.current || !ctx?.usersList) return;
		isListFrozenRef.current = true;

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
	}, [isListFrozen, ctx?.usersList, setUsersListSections]);

	// unfreeze list when component unmounts
	useEffect(() => {
		return () => {
			isListFrozenRef.current = false;
		};
	}, []);

	const refreshList = () => {
		isListFrozenRef.current = false;
		forceRender({});
	};

	return (
		<PopupContainer>
			<PopupHeader>
				<PopupHeaderTitle>
					<h2>Users</h2>
					<h4> ({ctx?.usersList.length})</h4>
				</PopupHeaderTitle>
				<PopupHeaderButtons>
					<HeaderButton onClick={() => refreshList()}>
						<BsArrowClockwise />
					</HeaderButton>
					<HeaderButton onClick={() => closePopup()}>
						<BsX viewBox='3 3 10 10' />
					</HeaderButton>
				</PopupHeaderButtons>
			</PopupHeader>
			<PopupContentHeader>
				<TextInput value={searchValue} setValue={setSearchValue} placeholder='Search...' size='small'>
					<BsSearch size='auto' style={{ padding: '2px' }} />
				</TextInput>
			</PopupContentHeader>
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
