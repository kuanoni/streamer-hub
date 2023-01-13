import React, { FC, useContext } from 'react';
import { styled, theme } from 'stiches.config';

import { AbsoluteContainer, RelativeContainer } from '../styles';
import StreamContext from './context/StreamContext';

const diagonalLinesColor = 'rgba(255, 255, 255, 0.015)';

const StreamEmbedContainer = styled(AbsoluteContainer, {
	display: 'flex',
	alignItems: 'center',
	backgroundSize: '412px 412px',
	backgroundRepeat: 'repeat',
	backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' fill-opacity='1' style='enable-background:new 0 0 500 500'%3E%3Cstyle%3E .st2{fill:${diagonalLinesColor}} %3C/style%3E%3Cg style='display:none'%3E%3Cpath style='display:inline;fill:%23414042' d='M-8.3-5.7h520.7V511H-8.3z' id='Layer_2'/%3E%3C/g%3E%3Cg id='Layer_1'%3E%3Cpath transform='rotate(-45.001 0 .055)' class='st2' d='M-453.7-3.7h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 31.25 31.306)' class='st2' d='M-422.5 27.6H485v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 62.5 62.556)' class='st2' d='M-391.2 58.8h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 93.75 93.807)' class='st2' d='M-360 90.1h907.5v7.5H-360z'/%3E%3Cpath transform='rotate(-45.001 125 125.057)' class='st2' d='M-328.7 121.3h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 156.249 156.308)' class='st2' d='M-297.5 152.6H610v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 187.499 187.558)' class='st2' d='M-266.2 183.8h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 218.749 218.809)' class='st2' d='M-235 215.1h907.5v7.5H-235z'/%3E%3Cpath transform='rotate(-45.001 249.998 250.06)' class='st2' d='M-203.7 246.3h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 281.248 281.31)' class='st2' d='M-172.5 277.6H735v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 312.498 312.56)' class='st2' d='M-141.2 308.8h907.5v7.5h-907.5z'/%3E%3Cpath transform='rotate(-45.001 343.748 343.81)' class='st2' d='M-110 340.1h907.5v7.5H-110z'/%3E%3Cpath transform='rotate(-45.001 374.997 375.061)' class='st2' d='M-78.7 371.3h907.5v7.5H-78.7z'/%3E%3Cpath transform='rotate(-45.001 406.247 406.312)' class='st2' d='M-47.5 402.6H860v7.5H-47.5z'/%3E%3Cpath transform='rotate(-45.001 437.497 437.562)' class='st2' d='M-16.2 433.8h907.5v7.5H-16.2z'/%3E%3Cpath transform='rotate(-45.001 468.747 468.813)' class='st2' d='M15 465.1h907.5v7.5H15z'/%3E%3Cpath transform='rotate(-45.001 499.997 500.064)' class='st2' d='M46.3 496.3h907.5v7.5H46.3z'/%3E%3C/g%3E%3C/svg%3E")`,
});

const StreamEmbedWrapper = styled('div', {
	width: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	aspectRatio: '16 / 9',
});

const StyledIframe = styled('iframe', {
	aspectRatio: '16 / 9',
	backgroundColor: theme.colors.primary900,
	border: 'none',
	boxShadow: 'rgba(117, 52, 223, 0.22) 0px 0px 12px 1px',
});

const StreamEmbed = () => {
	const ctx = useContext(StreamContext);

	return (
		<RelativeContainer>
			<StreamEmbedContainer>
				<StreamEmbedWrapper>
					{!ctx?.isLoaded ? (
						<></>
					) : ctx.streamSource === 'twitch' ? (
						<StyledIframe
							src='https://player.twitch.tv/?channel=public_domain_television&parent=localhost'
							width='100%'
							height='100%'
							title='Faker stream'
						/>
					) : ctx.streamSource === 'youtube' ? (
						<StyledIframe
							width='100%'
							height='100%'
							src='https://www.youtube.com/embed/j_A_jAsuZD8/embed/live_stream?channel=UCM2fsEsL6rW99JYMPFmwgtA&origin=http://localhost:3000/'
						/>
					) : (
						<></>
					)}
				</StreamEmbedWrapper>
			</StreamEmbedContainer>
		</RelativeContainer>
	);
};

export default StreamEmbed;
