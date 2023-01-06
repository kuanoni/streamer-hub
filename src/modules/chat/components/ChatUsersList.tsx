import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsArrowClockwise, BsSearch, BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import { Role } from '@globalTypes/user';
import getUsernameColorsCss from '@utils/getUsernameColorsCss';

import { UsersList, UsersListItem } from '../common';
import ChatPopup from './ChatPopup';
import SocketContext from './context/SocketContext';

const Lists = styled('div', {
	padding: '.5rem 0',
	overflowY: 'auto',
	scrollbarWidth: 'thin',
});

const ListSection = styled('section', {
	'&:not(:empty)': {
		padding: '.5em 0',
	},
});

const NameWrapper = styled('div', {
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

const getNameComponent = (user: UsersListItem) => {
	const color = getUsernameColorsCss(user.role, user.subTier);
	return (
		<NameWrapper key={user.username}>
			<Name css={color}>{user.username}</Name>
		</NameWrapper>
	);
};

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

	// reload users list
	const refreshList = () => {
		isListFrozenRef.current = false;
		forceRender({});
	};

	return (
		<ChatPopup>
			<ChatPopup.Header title='Users' subtitle={` (${ctx?.usersList.length})`} closePopup={closePopup}>
				<Button color='primaryTransparent' content='icon' size='2em' onClick={() => refreshList()}>
					<BsArrowClockwise />
				</Button>
			</ChatPopup.Header>
			<ChatPopup.Content>
				<TextInput value={searchValue} setValue={setSearchValue} placeholder='Search...' size='small'>
					<BsSearch size='auto' style={{ padding: '2px' }} />
				</TextInput>
				<Lists>
					{searchValue ? (
						<ListSection>
							{ctx?.usersList.map((user) => {
								if (user.username.toLowerCase().startsWith(searchValue.toLowerCase()))
									return getNameComponent(user);
							})}
						</ListSection>
					) : (
						usersListSections.map((sectionUsers, i) => {
							if (!sectionUsers.length) return <React.Fragment key={i}></React.Fragment>;

							return (
								<ListSection key={i}>{sectionUsers.map((user) => getNameComponent(user))}</ListSection>
							);
						})
					)}
				</Lists>
			</ChatPopup.Content>
		</ChatPopup>
	);
};

export default ChatUsersList;
