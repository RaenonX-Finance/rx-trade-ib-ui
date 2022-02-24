import React from 'react';

import {DataSocket} from '../../types/socket/type';


const getCurrentMinute = (): number => {
  return Math.floor(Date.now() / 60000);
};

export const useDataPoller = (socket: DataSocket) => {
  const [lastPollMin, setLastPollMin] = React.useState(getCurrentMinute());

  const pollData = React.useCallback(() => {
    socket.emit('pxRequest', '');
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const currentMin = getCurrentMinute();

      if (currentMin === lastPollMin) {
        return;
      }

      pollData();
      setLastPollMin(currentMin);
    }, 100);

    return () => clearInterval(intervalId);
  });
};
