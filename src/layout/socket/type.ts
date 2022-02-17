import {Socket} from 'socket.io-client';


type SocketMessageHandler = (message: string) => void;

type SocketEventKeys =
  'pxUpdated' |
  'pxUpdatedMarket' |
  'pxInit' |
  'position' |
  'openOrder' |
  'execution' |
  'orderPlace' |
  'orderCancel';

export type SocketEvent = {[key in SocketEventKeys]: SocketMessageHandler};

export type DataSocket = Socket<SocketEvent>;
