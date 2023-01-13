import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

const Thumbnail = styled(Image, {
	display: 'block',
	width: 'auto',
	height: 'auto',
	maxWidth: '100%',
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
		width: '30%',
		height: '30%',
		color: 'rgb(255, 255, 255, .6)',
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

const ThumbnailResolutions = {
	normal: { filename: 'mqdefault', width: 320, height: 180 },
	hd: { filename: 'maxresdefault', width: 1280, height: 720 },
} as const;

interface Props {
	videoId: string;
	resolution: keyof typeof ThumbnailResolutions;
}

const YoutubeThumbnail = ({ videoId, resolution }: Props) => {
	const { filename, width, height } = ThumbnailResolutions[resolution];

	return (
		<Container href={`https://www.youtube.com/watch?v=${videoId}`} target='_blank'>
			<Thumbnail
				src={`https://img.youtube.com/vi/${videoId}/${filename}.jpg`}
				alt=''
				width={width}
				height={height}
			/>
			<Overlay>
				<BsYoutube />
			</Overlay>
		</Container>
	);
};

export default YoutubeThumbnail;
