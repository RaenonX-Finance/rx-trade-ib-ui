import React from 'react';

import {DeepPartial} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

import {Order} from '../../../types/order';
import {OrderPanelControl} from './control';
import {OrderPanelPx} from './px';
import {OrderPanelQuantity} from './quantity';
import {OrderPanelSide} from './side';
import {OrderPanelProps} from './type';


export const OrderPanel = ({state, setState}: OrderPanelProps) => {
  const {show, order, pxTick} = state;

  const setStateOrder = (order: DeepPartial<Order>) => {
    setState({...state, order: {...state.order, ...order}});
  };

  const handleClose = () => setState({...state, show: false});

  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom" scroll style={{height: '40vh'}}>
      <div className="mb-0"/>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Order Entry
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="my-0"/>
      <Offcanvas.Body>
        <Row>
          <Col xs={8}/>
          <Col xs={4}>
            <OrderPanelSide order={order} setOrder={setStateOrder}/>
            <Row>
              <Col>
                <OrderPanelQuantity order={order} setOrder={setStateOrder}/>
              </Col>
              <Col>
                <OrderPanelPx order={order} setOrder={setStateOrder} pxTick={pxTick}/>
              </Col>
            </Row>
            <OrderPanelControl state={state} setState={setState}/>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
