import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useSocketInit} from '../../hooks/socket/init';
import {useExecutionSelector} from '../../state/execution/selector';
import {useOpenOrderSelector} from '../../state/openOrder/selector';
import {usePositionSelector} from '../../state/position/selector';
import {usePxDataSelector} from '../../state/pxData/selector';
import {getPxDataTitle} from '../../utils/pxData';
import {PxDataAlwaysShow} from './alwaysShow';
import {PxDataCollapsible} from './collapsible';
import {ErrorPopup} from './error/main';
import {PxDataIndividualProps} from './individual';


export const PxDataMain = () => {
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
          .map((data) => {
            const props: PxDataIndividualProps = {
              pxData: data,
              title: getPxDataTitle(data),
              payload: {
                position: position[data.contract.identifier],
                openOrder: openOrders[data.contract.identifier],
                execution: execution[data.contract.identifier],
              },
            };

            if (!data.isMajor) {
              return (
                <Col key={data.uniqueIdentifier} xs={6}>
                  <PxDataCollapsible {...props}/>
                </Col>
              );
            }

            return (
              <Col key={data.uniqueIdentifier} xs={6}>
                <PxDataAlwaysShow {...props}/>
              </Col>
            );
          })}
      </Row>
    </>
  );
};
