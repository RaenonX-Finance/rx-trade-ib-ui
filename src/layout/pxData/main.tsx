import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {pxDataDispatchers} from '../../state/pxData/dispatchers';
import {usePxDataSelector} from '../../state/pxData/selector';
import {PxDataDispatcherName} from '../../state/pxData/types';
import {useDispatch} from '../../state/store';
import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {SocketContext} from '../socket/socket';
import {PriceDataIndividual} from './individual';


export const PriceDataMain = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const pxData = usePxDataSelector();

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
  };

  React.useEffect(() => {
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);

    socket.emit('pxInit', '');

    return () => {
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
    };
  }, []);

  return (
    <Row className="mb-3 g-3">
      {Object.values(pxData).map((data) => (
        <Col key={data.uniqueIdentifier} xs={6}>
          <PriceDataIndividual data={data}/>
        </Col>
      ))}
    </Row>
  );
};
