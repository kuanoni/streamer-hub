import Image from 'next/image';
import { styled, theme } from 'stiches.config';

import { InfoBadge, Role, SubscriptionTier } from '@globalTypes/user';
import Tier1 from '@images/flairs/tier_1.png';
import Tier2 from '@images/flairs/tier_2.png';
import Tier3 from '@images/flairs/tier_3.png';

const Container = styled('span', {
	display: 'inline-flex',
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
		role: {},
	},
});

const BadgeContainer = styled('span', {
	display: 'inline-flex',
	alignItems: 'center',
	[`svg, img`]: {
		maxWidth: '1em',
		maxHeight: '1em',
	},
});

const Username = styled('span', {
	padding: '0 .25em',
});

const badges: { [index: string]: React.ReactNode } = {
	[SubscriptionTier.TIER_1]: <Image src={Tier1} alt='Tier 1 subscriber' />,
	[SubscriptionTier.TIER_2]: <Image src={Tier2} alt='Tier 2 subscriber' />,
	[SubscriptionTier.TIER_3]: <Image src={Tier3} alt='Tier 3 subscriber' />,
};

interface Props {
	subTier: SubscriptionTier;
	infoBadges: InfoBadge[] | undefined;
	role: Role | undefined;
	onClick: () => void;
}

const TextMessageAuthor = ({ subTier, infoBadges, role, onClick, children }: React.PropsWithChildren<Props>) => {
	console.log(subTier, infoBadges, role);
	return (
		<Container onClick={onClick}>
			<BadgeContainer></BadgeContainer>
			<Username>{children}:</Username>
		</Container>
	);
};

export default TextMessageAuthor;
