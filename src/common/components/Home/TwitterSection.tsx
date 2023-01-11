import { useEffect, useRef } from 'react';
import { Timeline } from 'react-twitter-widgets';

import Section from './Section';

interface Props {
	maxHeight: number | string;
}

const TwitterSection = ({ maxHeight }: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const iframe = ref.current?.querySelector('iframe');
		if (iframe) iframe.style.background = 'transparent';
	}, []);

	return (
		<Section>
			<Section.Header>Twitter</Section.Header>
			<Section.Content ref={ref} css={{ maxHeight, overflowY: 'auto' }}>
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
