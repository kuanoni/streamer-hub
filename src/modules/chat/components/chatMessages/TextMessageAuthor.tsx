import Image from 'next/image';
import React from 'react';
import { styled, theme } from 'stiches.config';

import { InfoBadge, Role, SubscriptionTier } from '@globalTypes/user';
import Tier1 from '@images/flairs/tier_1.png';
import Tier2 from '@images/flairs/tier_2.png';
import Tier3 from '@images/flairs/tier_3.png';

const Container = styled('span', {
	display: 'inline-flex',
	margin: 0,
	fontSize: 'inherit',
	fontWeight: 900,
	verticalAlign: 'bottom',
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
	borderRadius: theme.space.borderRadHalf,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
});

const subBadgeImages: { [index: string]: React.ReactNode } = {
	[SubscriptionTier.TIER_1]: <Image src={Tier1} alt='Tier 1 subscriber' title='Tier 1 subscriber' />,
	[SubscriptionTier.TIER_2]: <Image src={Tier2} alt='Tier 2 subscriber' title='Tier 2 subscriber' />,
	[SubscriptionTier.TIER_3]: <Image src={Tier3} alt='Tier 3 subscriber' title='Tier 3 subscriber' />,
};

const infoBadgeImages = {
	[InfoBadge.LAWYER]: <Image src={Tier3} alt='Lawyer' title='Lawyer' />,
};

const subscriberColors = {
	[SubscriptionTier.TIER_1]: {
		color: 'rgb(232, 219, 164)',
	},
	[SubscriptionTier.TIER_2]: {
		color: 'rgb(231, 214, 36)',
	},
	[SubscriptionTier.TIER_3]: {
		color: 'rgb(17, 225, 224)',
	},
	[SubscriptionTier.PERMANENT]: {
		color: 'rgb(48, 19, 255)',
	},
};

const roleColors = {
	[Role.BUDDY]: {
		color: theme.colors.primary300,
		backgroundColor: theme.colors.frostedPrimary,
	},
	[Role.OWNER]: {
		color: 'rgb(225, 53, 53)',
		backgroundColor: '#ff000826',
	},
};

interface Props {
	subTier: SubscriptionTier;
	infoBadges: InfoBadge[] | undefined;
	role: Role | undefined;
	onClick: () => void;
}

const TextMessageAuthor = ({ subTier, infoBadges, role, onClick, children }: React.PropsWithChildren<Props>) => {
	const colors = role ? roleColors[role] : subTier ? subscriberColors[subTier] : {};
	const badges: React.ReactNode[] = [];

	if (subTier) badges.push(subBadgeImages[subTier]);
	if (infoBadges) infoBadges.forEach((badge) => badges.push(infoBadgeImages[badge]));

	return (
		<Container onClick={onClick}>
			<BadgeContainer>
				{badges.map((badge, i) => (
					<React.Fragment key={i}>{badge}</React.Fragment>
				))}
			</BadgeContainer>
			<Username css={colors}>{children}:</Username>
		</Container>
	);
};

export default TextMessageAuthor;
