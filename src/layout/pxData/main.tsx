import React from 'react';

import {useAlert} from 'react-alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {executionDispatchers} from '../../state/execution/dispatchers';
import {useExecutionSelector} from '../../state/execution/selector';
import {ExecutionDispatcherName} from '../../state/execution/types';
import {openOrderDispatchers} from '../../state/openOrder/dispatchers';
import {useOpenOrderSelector} from '../../state/openOrder/selector';
import {OpenOrderDispatcherName} from '../../state/openOrder/types';
import {positionDispatchers} from '../../state/position/dispatchers';
import {usePositionSelector} from '../../state/position/selector';
import {PositionDispatcherName} from '../../state/position/types';
import {pxDataDispatchers} from '../../state/pxData/dispatchers';
import {usePxDataSelector} from '../../state/pxData/selector';
import {PxDataDispatcherName} from '../../state/pxData/types';
import {useDispatch} from '../../state/store';
import {Execution} from '../../types/execution';
import {OpenOrder} from '../../types/openOrder';
import {OrderFilledResult} from '../../types/orderFilled';
import {Position} from '../../types/position';
import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {OrderFilledAlert} from '../alert/orderFilled';
import {SocketContext} from '../socket/socket';
import {PriceDataIndividual} from './individual';


export const PriceDataMain = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const alert = useAlert();
  const pxData = usePxDataSelector();
  const position = usePositionSelector();
  const openOrderState = useOpenOrderSelector();
  const execution = useExecutionSelector();

  const {openOrders, poll} = openOrderState;

  if (!socket) {
    return <>Not Connected</>;
  }

  const refreshStatus = (forceOpenOrderRefresh: boolean = false) => {
    socket.emit('position', '');
    socket.emit('execution', '');
    if (poll || forceOpenOrderRefresh) {
      socket.emit('openOrder', '');
    }
  };

  const onPxInit = (message: string) => {
    const data: PxData[] = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.INIT](data));
    refreshStatus();
  };

  const onPxUpdated = (message: string) => {
    const pxData: PxData = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE](pxData));
    refreshStatus();
  };

  const onPxUpdatedMarket = (message: string) => {
    const data: PxDataMarket = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET](data));
  };

  const onPosition = (message: string) => {
    const data: Position = JSON.parse(message);

    dispatch(positionDispatchers[PositionDispatcherName.UPDATE](data));
  };

  const onOpenOrder = (message: string) => {
    const data: OpenOrder = JSON.parse(message);

    dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE](data));
  };

  const onExecution = (message: string) => {
    const data: Execution = JSON.parse(message);

    dispatch(executionDispatchers[ExecutionDispatcherName.UPDATE](data));
  };

  const onOrderFilled = (message: string) => {
    const data: OrderFilledResult = JSON.parse(message);
    const audio = new Audio('/audio/orderFilled.mp3');

    alert.show(<OrderFilledAlert data={data}/>);
    audio.play().then(() => void 0);
    refreshStatus(true);
  };

  React.useEffect(() => {
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);
    socket.on('position', onPosition);
    socket.on('openOrder', onOpenOrder);
    socket.on('execution', onExecution);
    socket.on('orderFilled', onOrderFilled);

    socket.emit('pxInit', '');

    return () => {
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
      socket.off('pxInit', onPxInit);
      socket.off('position', onPosition);
      socket.off('openOrder', onOpenOrder);
      socket.off('execution', onExecution);
      socket.off('orderFilled', onOrderFilled);
    };
  }, [poll]); // if `poll` changes, the variable used for event listener should also be updated

  return (
    <Row className="g-3">
      {Object.values(pxData)
        .sort((a, b) => (
          a.contract.identifier - b.contract.identifier ||
          a.periodSec - b.periodSec
        ))
        .map((data) => (
          <Col key={data.uniqueIdentifier} xs={6}>
            <PriceDataIndividual
              pxData={data}
              payload={{
                position: position[data.contract.identifier],
                openOrder: openOrders[data.contract.identifier],
                execution: execution[data.contract.identifier],
              }}
            />
          </Col>
        ))}
    </Row>
  );
};
