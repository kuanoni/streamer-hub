import React, { useEffect, useState } from 'react';

import StreamContext, { StreamProviderIface, StreamSource } from './StreamContext';

type Props = {
	children: React.ReactNode;
};

const StreamProvider = ({ children }: Props) => {
	const [streamSource, setStreamSource] = useState<StreamSource>('twitch');

	const changeStreamSource = (newSource: StreamSource) => {
		localStorage.setItem('streamEmbedSource', newSource);
		setStreamSource(newSource);
	};

	useEffect(() => {
		setStreamSource(localStorage.getItem('streamEmbedSource') as StreamSource);
	}, [setStreamSource, setIsLoaded]);

	const providerValue: StreamProviderIface = {
		streamSource,
		changeStreamSource,
	};

	return <StreamContext.Provider value={providerValue}>{children}</StreamContext.Provider>;
};

export default StreamProvider;
