import React, { useEffect, useState } from 'react';

import StreamContext, { StreamProviderIface, StreamSource } from './StreamContext';

type Props = {
	children: React.ReactNode;
};

const StreamProvider = ({ children }: Props) => {
	const [streamSource, setStreamSource] = useState<StreamSource>('twitch');
	const [isLoaded, setIsLoaded] = useState(false);

	const changeStreamSource = (newSource: StreamSource) => {
		localStorage.setItem('streamEmbedSource', newSource);
		setStreamSource(newSource);
	};

	useEffect(() => {
		if (!localStorage.getItem('streamEmbedSource')) localStorage.setItem('streamEmbedSource', streamSource);
	}, []);

	useEffect(() => {
		setStreamSource(localStorage.getItem('streamEmbedSource') as StreamSource);
		setIsLoaded(true);
	}, [setStreamSource, setIsLoaded]);

	const providerValue: StreamProviderIface = {
		isLoaded,
		streamSource,
		changeStreamSource,
	};

	return <StreamContext.Provider value={providerValue}>{children}</StreamContext.Provider>;
};

export default StreamProvider;
