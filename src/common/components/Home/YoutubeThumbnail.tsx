import Image from 'next/image';
import { styled, theme } from 'stiches.config';

const Container = styled('div', {
	position: 'relative',
});

const Thumbnail = styled(Image, {
	display: 'block',
	width: 'auto',
	height: 'auto',
	maxWidth: '100%',
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
		<Thumbnail src={`https://img.youtube.com/vi/${videoId}/${filename}.jpg`} alt='' width={width} height={height} />
	);
};

export default YoutubeThumbnail;
