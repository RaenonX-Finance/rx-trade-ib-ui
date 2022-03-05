import {Socket} from 'socket.io-client';


export type SocketMessageHandler = (message: string) => void;

export type SocketEventKeys =
  'pxUpdated' |
  'pxUpdatedMarket' |
  'pxRequest' |
  'pxInit' |
  'position' |
  'openOrder' |
  'execution' |
  'orderPlace' |
  'orderFilled' |
  'orderCancel' |
  'error';

export type SocketEvent = {[key in SocketEventKeys]: SocketMessageHandler};

export type DataSocket = Socket<SocketEvent>;