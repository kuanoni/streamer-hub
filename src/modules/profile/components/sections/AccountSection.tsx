import { useState } from 'react';

import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import { User } from '@globalTypes/custom-auth';

import { Footer, Label, StyledLink, SubLabel } from '../../styles';
import ProfileSection from '../ProfileSection';

interface Props {
	user: User;
	locked?: boolean;
}

const AccountSection = ({ user, locked = false }: Props) => {
	const [email, setEmail] = useState(user.email);

	const saveAccount = () => {};

	return (
		<ProfileSection title='Account' locked={locked}>
			<Label>Username</Label>
			<TextInput value={user.displayName} setValue={() => {}} placeholder={'Enter username...'} disabled />
			<SubLabel>
				You can request a name change <StyledLink href='/'>here.</StyledLink>
			</SubLabel>
			<Label>Email</Label>
			<TextInput value={email} setValue={setEmail} placeholder='Enter email...' />
			<Footer>
				<Button onClick={saveAccount}>Save</Button>
			</Footer>
		</ProfileSection>
	);
};

export default AccountSection;
