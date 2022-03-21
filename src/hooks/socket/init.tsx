import React from 'react';

import {useAlert} from 'react-alert';

import {OrderFilledAlert} from '../../layout/alert/orderFilled';
import {errorDispatchers} from '../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../state/error/types';
import {executionDispatchers} from '../../state/execution/dispatchers';
import {ExecutionDispatcherName} from '../../state/execution/types';
import {openOrderDispatchers} from '../../state/openOrder/dispatchers';
import {useOpenOrderSelector} from '../../state/openOrder/selector';
import {OpenOrderDispatcherName} from '../../state/openOrder/types';
import {positionDispatchers} from '../../state/position/dispatchers';
import {PositionDispatcherName} from '../../state/position/types';
import {pxDataDispatchers} from '../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../state/pxData/types';
import {useDispatch} from '../../state/store';
import {OrderFilledResult} from '../../types/orderFilled';
import {SocketContext} from '../../types/socket/socket';
import {DataSocket} from '../../types/socket/type';
import {useAudio} from '../audio/main';
import {useSocketEventHandler} from './utils';


export const useSocketInit = (): DataSocket => {
  const socket = React.useContext(SocketContext);
  const openOrderState = useOpenOrderSelector();
  const lastUpdate = React.useRef(0);
  const {playBuy, playSell} = useAudio();

  const {poll} = openOrderState;

  if (!socket) {
    throw new Error('Socket not defined');
  }

  const dispatch = useDispatch();
  const alert = useAlert();

  const refreshStatus = React.useCallback((forceOpenOrderRefresh: boolean = false) => {
    const now = Date.now();

    // Only refresh once per 3 secs
    // > not using `setInterval()` because the frequency is more unreliable
    if (now - lastUpdate.current < 3000) {
      return;
    }

    lastUpdate.current = now;
    socket.emit('position', '');
    socket.emit('execution', '');
    if (poll || forceOpenOrderRefresh) {
      socket.emit('openOrder', '');
    }
  }, [poll]);

  // Events
  const onPxInit = useSocketEventHandler(dispatch, pxDataDispatchers[PxDataDispatcherName.INIT], refreshStatus);
  const onPxUpdated = useSocketEventHandler(dispatch, pxDataDispatchers[PxDataDispatcherName.UPDATE]);
  const onPxUpdatedMarket = useSocketEventHandler(
    dispatch,
    pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
    refreshStatus,
  );
  const onPosition = useSocketEventHandler(dispatch, positionDispatchers[PositionDispatcherName.UPDATE]);
  const onOpenOrder = useSocketEventHandler(dispatch, openOrderDispatchers[OpenOrderDispatcherName.UPDATE]);
  const onExecution = useSocketEventHandler(dispatch, executionDispatchers[ExecutionDispatcherName.UPDATE]);
  const onError = useSocketEventHandler(
    dispatch,
    errorDispatchers[ErrorDispatcherName.UPDATE],
    () => refreshStatus(true),
  );

  const onOrderFilled = React.useCallback((message: string) => {
    const data: OrderFilledResult = JSON.parse(message);
    const {action} = data;

    alert.show(<OrderFilledAlert data={data}/>);
    if (action === 'BUY') {
      playBuy();
    } else if (action === 'SELL') {
      playSell();
    }

    refreshStatus(true);
  }, []);

  React.useEffect(() => {
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);
    socket.on('position', onPosition);
    socket.on('openOrder', onOpenOrder);
    socket.on('execution', onExecution);
    socket.on('error', onError);
    socket.on('orderFilled', onOrderFilled);

    socket.emit('pxInit', '');

    return () => {
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
      socket.off('pxInit', onPxInit);
      socket.off('position', onPosition);
      socket.off('openOrder', onOpenOrder);
      socket.off('execution', onExecution);
      socket.off('error', onError);
      socket.off('orderFilled', onOrderFilled);
    };
  }, [poll]); // if `poll` changes, the variable used for event listener should also be updated

  return socket;
};
