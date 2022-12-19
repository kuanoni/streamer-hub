import { PropsWithChildren } from 'react';
import { styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';

const Grid = styled('div', {
	display: 'grid',
	gridAutoFlow: 'column',
	gridTemplateRows: '6rem auto',
	gridTemplateColumns: '14rem auto',
	width: '100%',
});

const TopCutout = styled('div', {
	width: '14rem',
	height: '6rem',
	borderTopLeftRadius: theme.space.borderRad,
	backgroundImage: `radial-gradient(circle at 50% 8.2rem, transparent 6rem, ${theme.colors.primary900} 0)`,
});

const Avatar = styled('img', {
	display: 'block',
	width: '10rem',
	height: '10rem',
	margin: '0 auto',
	marginTop: '-3rem',
	borderRadius: '50%',
	zIndex: 1,
});

interface Props {
	user: User;
}

const ProfileHeaderContainer = ({ user, children }: PropsWithChildren<Props>) => {
	return (
		<Grid>
			<TopCutout />
			<Avatar src={user.avatar} alt='profile picture' referrerPolicy='no-referrer' />
			{children}
		</Grid>
	);
};

export default ProfileHeaderContainer;
