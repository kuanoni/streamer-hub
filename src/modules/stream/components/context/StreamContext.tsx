import { createContext, Dispatch, SetStateAction } from 'react';

export type StreamSource = 'twitch' | 'youtube' | 'facebook';

export interface StreamProviderIface {
	streamSource: StreamSource;
	setStreamSource: Dispatch<SetStateAction<StreamSource>>;
}

const StreamContext = createContext<StreamProviderIface | null>(null);

export default StreamContext;
