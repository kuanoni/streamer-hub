import React from 'react';
import { styled, theme } from 'stiches.config';

import ProfileSection from './ProfileSection';



const AccountSection = () => {
	return (
		<ProfileSection title='Account'>
			<Label>Joined</Label>
			<Info>6th June, 2021 at 21:47 pm</Info>
			<Label>Subscription</Label>
			<Info>You have no active subscriptions.</Info>
		</ProfileSection>
	);
};

export default AccountSection;
