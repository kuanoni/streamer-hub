import Image from 'next/image';
import { styled, theme } from 'stiches.config';

import Tier1 from '@images/flairs/tier_1.png';
import Tier2 from '@images/flairs/tier_2.png';
import Tier3 from '@images/flairs/tier_3.png';
import { MessageFlair } from '@modules/chat/common';

const Author = styled('span', {
	display: 'inline',
	padding: 0,
	paddingLeft: 3,
	margin: 0,
	border: 'none',
	color: 'inherit',
	background: 'none',
	fontSize: 'inherit',
	fontWeight: 900,
	'&:hover': {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
	[`svg, img`]: {
		maxWidth: '1rem',
		maxHeight: '1rem',
		verticalAlign: 'middle',
		marginRight: '.25em',
	},
});

const flairs: { [index: string]: React.ReactNode } = {
	[MessageFlair.TIER_1_SUB]: <Image src={Tier1} alt='Tier 1 subscriber' />,
	[MessageFlair.TIER_2_SUB]: <Image src={Tier2} alt='Tier 2 subscriber' />,
	[MessageFlair.TIER_3_SUB]: <Image src={Tier3} alt='Tier 3 subscriber' />,
};

interface Props {
	flair: string;
	onClick: () => void;
}

const UserMessageAuthor = ({ flair, onClick, children }: React.PropsWithChildren<Props>) => {
	return <Author onClick={onClick}>{children}</Author>;
};

export default UserMessageAuthor;
