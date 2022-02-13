import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {positionDispatchers} from '../../state/position/dispatchers';
import {usePositionSelector} from '../../state/position/selector';
import {PositionDispatcherName} from '../../state/position/types';
import {pxDataDispatchers} from '../../state/pxData/dispatchers';
import {usePxDataSelector} from '../../state/pxData/selector';
import {PxDataDispatcherName} from '../../state/pxData/types';
import {useDispatch} from '../../state/store';
import {Position} from '../../types/position';
import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {SocketContext} from '../socket/socket';
import {PriceDataIndividual} from './individual';


export const PriceDataMain = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const pxData = usePxDataSelector();
  const position = usePositionSelector();

  if (!socket) {
    return <>Not Connected</>;
  }

  const onPxUpdated = (message: string) => {
    const pxData: PxData = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE](pxData));
  };

  const onPxUpdatedMarket = (message: string) => {
    const data: PxDataMarket = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET](data));
  };

  const onPxInit = (message: string) => {
    const data: PxData[] = JSON.parse(message);

    dispatch(pxDataDispatchers[PxDataDispatcherName.INIT](data));
    socket.emit('position', '');
  };

  const onPositionRequested = (message: string) => {
    const data: Position = JSON.parse(message);

    console.log('posRequested', data);

    dispatch(positionDispatchers[PositionDispatcherName.UPDATE](data));
  };

  React.useEffect(() => {
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);
    socket.on('position', onPositionRequested);

    socket.emit('pxInit', '');

    return () => {
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
      socket.off('pxInit', onPxInit);
      socket.off('position', onPositionRequested);
    };
  }, []);

  return (
    <Row className="mb-3 g-3">
      {Object.values(pxData).map((data) => (
        <Col key={data.uniqueIdentifier} xs={6}>
          <PriceDataIndividual pxData={data} position={position[data.uniqueIdentifier]}/>
        </Col>
      ))}
    </Row>
  );
};
