import { Timeline, TimelineProps } from 'react-twitter-widgets';
import { styled, theme } from 'stiches.config';

import Section from './Section';

const Container = styled('div', {});

interface Props {
	maxHeight: number | string;
}

const TwitterSection = ({ maxHeight }: Props) => {
	return (
		<Section>
			<Section.Header>Twitter</Section.Header>
			<Section.Content maxHeight={maxHeight} overflowY='auto'>
				<Timeline
					dataSource={{
						sourceType: 'profile',
						screenName: 'theomniliberal',
					}}
					options={{
						theme: 'dark',
						chrome: 'noheader, nofooter, noscrollbar',
						tweetLimit: 10,
						dnt: true,
					}}
				/>
			</Section.Content>
		</Section>
	);
};

export default TwitterSection;
