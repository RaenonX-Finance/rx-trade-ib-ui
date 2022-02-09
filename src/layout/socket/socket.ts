import React from 'react';

import {DataSocket} from './type';


export const SocketContext = React.createContext<DataSocket | undefined>(undefined);
