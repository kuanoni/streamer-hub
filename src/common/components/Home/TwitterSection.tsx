import { CSSProperties, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Timeline } from 'react-twitter-widgets';
import { styled, theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import Section from '../Section';

const contentCss: CSS = {
	position: 'relative',
	height: '100%',
	overflowY: 'auto',
	borderRight: `1px solid ${theme.colors.grey700}`,
	'@sm': { maxWidth: 'calc(100vw - 2rem)' },
};

const LoaderWrapper = styled('div', {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});

interface Props {
	username: string;
}

const TwitterSection = ({ username }: Props) => {
	const [isLoaded, setItLoaded] = useState(false);

	return (
		<Section css={{ borderRadius: '11px' }}>
			<Section.Header></Section.Header>
			<Section.Content css={contentCss}>
				<Timeline
					dataSource={{
						sourceType: 'profile',
						screenName: username,
					}}
					options={{
						theme: 'dark',
						chrome: 'noscrollbar, transparent',
						tweetLimit: 10,
						dnt: true,
					}}
					onLoad={() => setItLoaded(true)}
				/>
				<LoaderWrapper>
					<ClipLoader loading={!isLoaded} color={theme.colors.grey300.toString()} size='2rem' />
				</LoaderWrapper>
			</Section.Content>
		</Section>
	);
};

export default TwitterSection;
