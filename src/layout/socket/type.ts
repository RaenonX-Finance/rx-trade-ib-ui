import {Socket} from 'socket.io-client';


export type SocketEvent = {
  pxUpdated: (message: string) => void,
};

export type DataSocket = Socket<SocketEvent>;
