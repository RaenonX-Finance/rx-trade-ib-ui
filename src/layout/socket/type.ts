import {Socket} from 'socket.io-client';


type SocketMessageHandler = (message: string) => void;

export type SocketEvent = {
  pxUpdated: SocketMessageHandler,
  pxUpdatedMarket: SocketMessageHandler,
  pxInit: SocketMessageHandler,
  position: SocketMessageHandler,
  openOrder: SocketMessageHandler,
  execution: SocketMessageHandler,
};

export type DataSocket = Socket<SocketEvent>;
