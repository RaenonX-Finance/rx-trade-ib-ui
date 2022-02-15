import React from 'react';

import {DeepPartial} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

import {Order} from '../../../types/order';
import {OrderEntryPx} from './px';
import {OrderEntryQuantity} from './quantity';
import {OrderEntrySide} from './side';
import {OrderPanelState} from './type';


type Props = {
  state: OrderPanelState,
  setState: React.Dispatch<React.SetStateAction<OrderPanelState>>,
};

export const OrderPanel = ({state, setState}: Props) => {
  const {show, order, pxTick} = state;

  const setStateOrder = (order: DeepPartial<Order>) => {
    setState({...state, order: {...state.order, ...order}});
  };

  const handleClose = () => setState({...state, show: false});

  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom" scroll>
      <div className="mb-2"/>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Order Entry
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="my-2"/>
      <Offcanvas.Body>
        <Row>
          <Col>
            <OrderEntrySide order={order} setOrder={setStateOrder}/>
          </Col>
          <Col>
            <OrderEntryQuantity order={order} setOrder={setStateOrder}/>
          </Col>
          <Col>
            <OrderEntryPx order={order} setOrder={setStateOrder} pxTick={pxTick}/>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
