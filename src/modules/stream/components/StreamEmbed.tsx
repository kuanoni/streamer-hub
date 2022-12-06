import React, { FC } from 'react';
import { styled } from 'stiches.config';

const RelativeContainer = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',
});

const AbsoluteContainer = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	height: '100%',
});

const StreamEmbedContainer = styled(AbsoluteContainer, {
	display: 'flex',
	alignItems: 'center',
	padding: '.5rem',
	paddingRight: '2rem',
});

const StreamEmbedWrapper = styled('div', {
	width: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	aspectRatio: '16 / 9',
	boxShadow: '0px 0px 18px 1px rgba(117, 52, 223, 0.32)',
});

const StyledIframe = styled('iframe', {
	color: 'transparent',
	aspectRatio: '16 / 9',
});

interface Props {
	streamSource: string;
}

const StreamEmbed: FC<Props> = ({ streamSource }) => {
	return (
		<RelativeContainer>
			<StreamEmbedContainer>
				<StreamEmbedWrapper>
					<StyledIframe
						src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
						width='100%'
						height='100%'
						title='Faker stream'
					/>
				</StreamEmbedWrapper>
			</StreamEmbedContainer>
		</RelativeContainer>
	);
};

export default StreamEmbed;
