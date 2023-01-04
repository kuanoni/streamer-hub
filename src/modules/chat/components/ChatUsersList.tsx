import { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

import { moveIn } from '../styles';
import SocketContext from './context/SocketContext';

const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	paddingBottom: '1rem',
	fontSize: '.9rem',
	animation: `${moveIn} .2s`,
});

const Header = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	paddingLeft: '1rem',
	backgroundColor: theme.colors.primary900,
	borderBottom: `1px solid ${theme.colors.trinary700}`,
	h2: {
		margin: 0,
		fontSize: '1.25rem',
	},
});

const CloseButton = styled('button', {
	height: '1.75rem',
	padding: 0,
	backgroundColor: 'transparent',
	border: 'none',
	color: theme.colors.textMedium,
	aspectRatio: 1,
	cursor: 'pointer',
	'&:hover': {
		color: theme.colors.textMediumActive,
	},
	svg: {
		width: '100%',
		height: '100%',
		aspectRatio: 1,
	},
});

const Content = styled('div', {
	height: '100%',
	padding: '.5rem 0',
	overflowY: 'scroll',
	scrollbarWidth: 'thin',
});

const Section = styled('div', {
	padding: '.5em 0',
	'.title': {
		padding: '0 .5em',
		paddingBottom: '.25em',
		color: theme.colors.textDark,
		fontSize: '.94em',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
});

interface Props {
	closePopup: () => void;
}

const ChatUsersList = ({ closePopup }: Props) => {
	const ctx = useContext(SocketContext);
	const usersList = ctx?.usersList || [];

	return (
		<Container>
			<Header>
				<h2>Users</h2>
				<CloseButton onClick={() => closePopup()}>
					<BsX />
				</CloseButton>
			</Header>
			<Content>
				<Section>
					{usersList.map((user, i) => (
						<div key={i}>{user.username}</div>
					))}
				</Section>
			</Content>
		</Container>
	);
};

export default ChatUsersList;
