import Image from 'next/image';
import { styled, theme } from 'stiches.config';

const Thumbnail = styled(Image, {
	display: 'block',
	width: '100%',
	maxWidth: '100%',
	height: 'auto',
	aspectRatio: '16 / 9',
	objectFit: 'cover',
	objectPosition: 'center',
});

const Overlay = styled('div', {
	position: 'absolute',
	inset: '0 0 0 0',
	background: 'radial-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, .5))',
	opacity: 0,
	transition: 'opacity .2s ease',
	svg: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: '35%',
		height: '35%',
		minWidth: 32,
		minHeight: 32,
		opacity: 0.9,
		transform: 'translate(-50%, -50%)',
	},
});

const Container = styled('a', {
	position: 'relative',
	display: 'block',
	cursor: 'pointer',
	[`&:hover ${Overlay}`]: {
		opacity: 1,
	},
});

interface Props extends Pick<YoutubeVideoData, 'videoId' | 'thumbnails'> {
	resolution?: YoutubeThumbnailKeys;
}

const YoutubeThumbnail = ({ videoId, thumbnails, resolution = 'standard' }: Props) => {
	const thumbnail =
		thumbnails[resolution] ||
		thumbnails.maxres ||
		thumbnails.high ||
		thumbnails.medium ||
		thumbnails.standard ||
		thumbnails.default;

	if (!thumbnail) return <>thumbnail missing</>;

	return (
		<Container href={`https://www.youtube.com/watch?v=${videoId}`} target='_blank'>
			<Thumbnail src={thumbnail.url} alt='' width={thumbnail.width} height={thumbnail.height} />
			<Overlay>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					height='800'
					width='1200'
					viewBox='-35.20005 -41.33325 305.0671 247.9995'
				>
					<path
						d='M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85'
						fill='red'
					/>
					<path d='M93.333 117.559l61.333-34.89-61.333-34.894z' fill='#fff' />
				</svg>
			</Overlay>
		</Container>
	);
};

export default YoutubeThumbnail;
