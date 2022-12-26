import Image from 'next/image';
import { styled, theme } from 'stiches.config';

import Tier1 from '@images/flairs/tier_1.png';
import Tier2 from '@images/flairs/tier_2.png';
import Tier3 from '@images/flairs/tier_3.png';
import { UserFlair, UsernameColors } from '@modules/chat/common';

const Container = styled('span', {
	display: 'inline-flex',
	padding: '0 3px',
	margin: 0,
	borderRadius: theme.space.borderRadHalf,
	fontSize: 'inherit',
	fontWeight: 900,
	verticalAlign: 'bottom',
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
	variants: {
		flair: {
			t1: {
				color: theme.colors.grey900,
				backgroundColor: theme.colors.primary400,
			},
			t2: {
				color: theme.colors.primary300,
				backgroundColor: theme.colors.frostedPrimary,
			},
		},
	},
});

const BadgeContainer = styled('span', {
	display: 'inline-flex',
	alignItems: 'center',
	marginRight: '.25em',
	[`svg, img`]: {
		maxWidth: '1em',
		maxHeight: '1em',
	},
});

const badges: { [index: string]: React.ReactNode } = {
	[UserFlair.TIER_1_SUB]: <Image src={Tier1} alt='Tier 1 subscriber' />,
	[UserFlair.TIER_2_SUB]: <Image src={Tier2} alt='Tier 2 subscriber' />,
	[UserFlair.TIER_3_SUB]: <Image src={Tier3} alt='Tier 3 subscriber' />,
};

interface Props {
	flair: UserFlair;
	onClick: () => void;
}

const UserMessageAuthor = ({ flair, onClick, children }: React.PropsWithChildren<Props>) => {
	return (
		<Container flair={'t2'} onClick={onClick}>
			<BadgeContainer>{badges[flair]}</BadgeContainer>
			{children}
			{':'}
		</Container>
	);
};

export default UserMessageAuthor;
