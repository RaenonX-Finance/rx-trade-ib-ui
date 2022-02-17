import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {usePositionSelector} from '../../../../state/position/selector';
import {OrderPanelPartProps} from '../type';
import {OrderPanelControl} from './control';
import {OrderPanelPx} from './px';
import {OrderPanelQuantity} from './quantity';
import {OrderPanelSide} from './side';
import {OrderPanelStats} from './stats';


export const OrderEntry = (props: OrderPanelPartProps) => {
  const {state, setOrder, identifier} = props;
  const {order, pxTick} = state;
  const position = usePositionSelector()[identifier];

  return (
    <>
      <Row className="g-3">
        <Col>
          <OrderPanelSide order={order} setOrder={setOrder}/>
          <OrderPanelQuantity order={order} setOrder={setOrder} position={position}/>
        </Col>
        <Col>
          <OrderPanelPx order={order} setOrder={setOrder} pxTick={pxTick}/>
          <OrderPanelStats
            order={order}
            position={position}
            setOrder={setOrder}
            pxTick={pxTick}
          />
        </Col>
        <Col>
          <OrderPanelControl {...props}/>
        </Col>
      </Row>
    </>
  );
};
