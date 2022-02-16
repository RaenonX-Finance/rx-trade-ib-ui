import React from 'react';

import {DeepPartial} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {usePositionSelector} from '../../../../state/position/selector';
import {Order} from '../../../../types/order';
import {OrderPanelProps} from '../type';
import {OrderPanelControl} from './control';
import {OrderPanelPx} from './px';
import {OrderPanelQuantity} from './quantity';
import {OrderPanelSide} from './side';
import {OrderPanelStats} from './stats';


export const OrderEntry = (props: OrderPanelProps) => {
  const {state, setState, identifier} = props;
  const {order, pxTick} = state;
  const position = usePositionSelector();

  const setStateOrder = (order: DeepPartial<Order>) => {
    setState({...state, order: {...state.order, ...order}});
  };

  return (
    <>
      <Row className="g-3">
        <Col>
          <OrderPanelSide order={order} setOrder={setStateOrder}/>
          <OrderPanelQuantity order={order} setOrder={setStateOrder}/>
        </Col>
        <Col>
          <OrderPanelPx order={order} setOrder={setStateOrder} pxTick={pxTick}/>
          <OrderPanelStats
            order={order}
            position={position[identifier]}
            setOrder={setStateOrder}
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
