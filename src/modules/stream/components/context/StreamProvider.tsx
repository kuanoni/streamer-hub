import React, { useState } from 'react';
import StreamContext, { StreamSource, StreamProviderIface } from './StreamContext';

type Props = {
	children: React.ReactNode;
};

const StreamProvider = ({ children }: Props) => {
	const [streamSource, setStreamSource] = useState<StreamSource>('twitch');

	const providerValue: StreamProviderIface = {
		streamSource,
		setStreamSource,
	};

	return <StreamContext.Provider value={providerValue}>{children}</StreamContext.Provider>;
};

export default StreamProvider;
