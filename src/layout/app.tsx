import React from 'react';

import {Provider} from 'react-alert';
import {io} from 'socket.io-client';

import {PopupAlert} from '../components/alert/main';
import {SocketContext} from '../types/socket/socket';
import {DataSocket} from '../types/socket/type';
import {PxDataMain} from './main';


export const App = () => {
  const [socket, setSocket] = React.useState<DataSocket>();

  React.useEffect(() => {
    const newSocket = io('ws://localhost:8000', {path: '/ws/socket.io/'});

    setSocket(newSocket);

    newSocket.on('connect_error', (err) => {
      console.error(err);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Provider template={PopupAlert} timeout={3000} position="bottom center">
        {
          socket ?
            <PxDataMain/> :
            <>Not Connected</>
        }
      </Provider>
    </SocketContext.Provider>
  );
};
