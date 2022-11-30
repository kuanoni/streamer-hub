import { createContext } from 'react';

import { SocketProviderIface } from './SocketProviderIface';

const SocketContext = createContext<SocketProviderIface | null>(null);

export default SocketContext;
