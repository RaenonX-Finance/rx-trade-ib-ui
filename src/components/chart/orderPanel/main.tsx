import React from 'react';

import {DeepPartial} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

import {Order} from '../../../types/order';
import {OrderEntry} from './entry/main';
import {OrderList} from './list/main';
import styles from './main.module.scss';
import {OrderPanelProps} from './type';


export const OrderPanel = (props: OrderPanelProps) => {
  const {state, setState} = props;
  const {show} = state;

  const handleClose = () => setState({...state, show: false});

  const setOrder = (order: DeepPartial<Order>) => {
    setState({...state, order: {...state.order, ...order}});
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom">
      <div className="mb-0"/>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Order Entry
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="my-0"/>
      <Offcanvas.Body>
        <Row>
          <Col>
            <OrderList {...props}/>
          </Col>
          <Col className={styles['order-entry']}>
            <OrderEntry setOrder={setOrder} {...props}/>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
