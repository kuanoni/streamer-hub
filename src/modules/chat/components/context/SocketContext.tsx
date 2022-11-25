import { createContext } from 'react';

import { SocketIface } from './SocketIface';

const SocketContext = createContext<SocketIface | null>(null);

export default SocketContext;
