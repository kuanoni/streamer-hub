import IconSelector from '@/components/new/IconSelector';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { BsTwitch, BsYoutube, BsFacebook } from 'react-icons/bs';
import { StreamSource } from './context/StreamContext';

interface Props {
	streamSource: StreamSource;
	setStreamSource?: Dispatch<SetStateAction<StreamSource>>;
}

const StreamEmbedSelector: FC<Props> = ({ streamSource, setStreamSource }) => {
	return (
		<IconSelector
			choices={{
				twitch: <BsTwitch />,
				youtube: <BsYoutube />,
				facebook: <BsFacebook />,
			}}
			defaultChoice={streamSource}
			onSelect={setStreamSource || (() => {})}
		/>
	);
};

export default StreamEmbedSelector;
