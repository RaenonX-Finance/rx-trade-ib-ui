import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useSocketInit} from '../../hooks/socket/init';
import {useExecutionSelector} from '../../state/execution/selector';
import {useOpenOrderSelector} from '../../state/openOrder/selector';
import {usePositionSelector} from '../../state/position/selector';
import {usePxDataSelector} from '../../state/pxData/selector';
import {ErrorPopup} from './error/main';
import {PriceDataIndividual} from './individual';


export const PriceDataMain = () => {
  const pxData = usePxDataSelector();
  const position = usePositionSelector();
  const openOrderState = useOpenOrderSelector();
  const execution = useExecutionSelector();

  useSocketInit();

  const {openOrders} = openOrderState;

  return (
    <>
      <ErrorPopup/>
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
    </>
  );
};
