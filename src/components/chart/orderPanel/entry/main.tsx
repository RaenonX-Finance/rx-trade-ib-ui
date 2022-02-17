import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OrderPanelCommonProps, OrderPanelPartProps} from '../type';
import {OrderPanelControl} from './control';
import styles from './main.module.scss';
import {OrderPanelPx} from './px';
import {OrderPanelQuantity} from './quantity';
import {OrderPanelSide} from './side';
import {OrderPanelStats} from './stats';


export const OrderEntry = (props: OrderPanelPartProps) => {
  const {state, setOrder, position} = props;
  const {order, pxTick} = state;

  const panelProps: OrderPanelCommonProps = {
    order,
    setOrder,
    position,
  };

  return (
    <Row className={`g-3 ${styles['order-entry']}`}>
      <Col>
        <OrderPanelSide {...panelProps}/>
        <OrderPanelQuantity {...panelProps}/>
      </Col>
      <Col>
        <OrderPanelPx {...panelProps} pxTick={pxTick}/>
        <OrderPanelStats {...panelProps} pxTick={pxTick}/>
      </Col>
      <Col>
        <OrderPanelControl {...props}/>
      </Col>
    </Row>
  );
};
