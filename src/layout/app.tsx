import React from 'react';

import Container from 'react-bootstrap/Container';
import {io} from 'socket.io-client';

import {PriceDataMain} from './pxData/layout/main';
import {SocketContext} from './socket/socket';
import {DataSocket} from './socket/type';


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
      <Container>
        {
          socket ?
            <PriceDataMain/> :
            <>Not Connected</>
        }
      </Container>
    </SocketContext.Provider>
  );
};
