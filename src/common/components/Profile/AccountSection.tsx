import { useState } from 'react';

import TextInput from '@components/ui/TextInput';
import { User } from '@globalTypes/custom-auth';

import ProfileSection from './ProfileSection';
import { Info, Label } from './styles';

interface Props {
	user: User;
}

const AccountSection = ({ user }: Props) => {
	const [displayName, setDisplayName] = useState(user.displayName);
	const [email, setEmail] = useState(user.email);

	return (
		<ProfileSection title='Account'>
			<Label>Username</Label>
			<TextInput value={displayName} setValue={setDisplayName} placeholder={'Enter username...'} disabled />
			<Label>Email</Label>
			<TextInput value={email} setValue={setEmail} placeholder='Enter email...' />
			<Label>Subscription</Label>
			<Info>You have no active subscriptions.</Info>
		</ProfileSection>
	);
};

export default AccountSection;
