import { useState } from 'react';

import TextInput from '@components/ui/TextInput';
import { User } from '@globalTypes/custom-auth';

import ProfileSection from './ProfileSection';
import { Info, Label, StyledLink, SubLabel } from './styles';

interface Props {
	user: User;
}

const AccountSection = ({ user }: Props) => {
	const [displayName, setDisplayName] = useState(user.displayName);
	const [email, setEmail] = useState(user.email);

	return (
		<ProfileSection title='Account'>
			<Label>Username</Label>
			<SubLabel>
				You can request a name change <StyledLink href='/'>here.</StyledLink>
			</SubLabel>
			<TextInput value={displayName} setValue={setDisplayName} placeholder={'Enter username...'} disabled />
			<Label>Email</Label>
			<TextInput value={email} setValue={setEmail} placeholder='Enter email...' />
			<Label>Subscription</Label>
			<Info>You have no active subscriptions.</Info>
		</ProfileSection>
	);
};

export default AccountSection;
