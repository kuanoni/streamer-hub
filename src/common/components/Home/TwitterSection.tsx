import { Timeline } from 'react-twitter-widgets';

import Section from './Section';

interface Props {}

const TwitterSection = ({}: Props) => {
	return (
		<Section css={{ borderLeft: 'none' }}>
			<Section.Header>Twitter</Section.Header>
			<Section.Content css={{ height: '100%', overflowY: 'auto' }}>
				<Timeline
					dataSource={{
						sourceType: 'profile',
						screenName: 'theomniliberal',
					}}
					options={{
						theme: 'dark',
						chrome: 'noheader, nofooter, noscrollbar, transparent',
						tweetLimit: 10,
						dnt: true,
					}}
				/>
			</Section.Content>
		</Section>
	);
};

export default TwitterSection;
