import { Timeline } from 'react-twitter-widgets';
import { theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import Section from '../Section';

const contentCss: CSS = {
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${theme.colors.grey700}`,
	'@sm': { maxWidth: 'calc(100vw - 2rem)' },
};

interface Props {}

const TwitterSection = ({}: Props) => {
	return (
		<Section css={{ borderRadius: '11px' }}>
			<Section.Header></Section.Header>
			<Section.Content css={contentCss}>
				<Timeline
					dataSource={{
						sourceType: 'profile',
						screenName: 'theomniliberal',
					}}
					options={{
						theme: 'dark',
						chrome: 'noscrollbar, transparent',
						tweetLimit: 10,
						dnt: true,
					}}
				/>
			</Section.Content>
		</Section>
	);
};

export default TwitterSection;
