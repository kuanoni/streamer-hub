import { createContext } from 'react';

export type StreamSource = 'twitch' | 'youtube' | 'facebook';

export interface StreamProviderIface {
	isLoaded: boolean; // signals whether streamSource has been loaded from localStorage yet
	streamSource: StreamSource;
	changeStreamSource(newSource: StreamSource): void;
}

const StreamContext = createContext<StreamProviderIface | null>(null);

export default StreamContext;
