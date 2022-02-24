import React from 'react';

import {SocketContext} from '../../types/socket/socket';
import {DataSocket} from '../../types/socket/type';


export const useSocket = (): DataSocket => {
  const socket = React.useContext(SocketContext);

  if (!socket) {
    throw new Error('Socket not defined');
  }

  return socket;
};
