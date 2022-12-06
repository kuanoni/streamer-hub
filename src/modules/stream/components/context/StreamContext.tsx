import { createContext } from 'react';

export type StreamSource = 'twitch' | 'youtube' | 'facebook';

export interface StreamProviderIface {
	streamSource: StreamSource;
	setStreamSource: (source: StreamSource) => void;
}

const StreamContext = createContext<StreamProviderIface | null>(null);

export default StreamContext;
