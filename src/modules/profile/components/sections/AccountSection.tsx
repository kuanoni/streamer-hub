import { User } from 'next-auth';
import { useState } from 'react';

import TextButton from '@components/ui/TextButton';
import TextInput from '@components/ui/TextInput';

import { Footer, Label, StyledLink, SubLabel } from '../../styles';
import ProfileSection from '../ProfileSection';

interface Props {
	user: User;
	locked?: boolean;
}

const AccountSection = ({ user, locked = false }: Props) => {
	const [email, setEmail] = useState(user.email === null ? '' : user.email);

	const saveAccount = () => {};

	return (
		<ProfileSection title='Account' locked={locked}>
			<Label>Username</Label>
			<TextInput value={user.username} setValue={() => {}} placeholder={'Enter username...'} disabled />
			<SubLabel>
				You can request a name change <StyledLink href='/'>here.</StyledLink>
			</SubLabel>
			<Label>Email</Label>
			<TextInput value={email} setValue={setEmail} placeholder='Enter email...' />
			<Footer>
				<TextButton onClick={saveAccount}>Save</TextButton>
			</Footer>
		</ProfileSection>
	);
};

export default AccountSection;
