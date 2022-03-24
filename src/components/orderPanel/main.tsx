import React from 'react';

import {DeepPartial} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

import {usePositionSelector} from '../../state/position/selector';
import {Order} from '../../types/order';
import {OrderEntry} from './entry/main';
import {OrderList} from './list/main';
import styles from './main.module.scss';
import {OrderPanelProps} from './type';


export const OrderPanel = (props: Omit<OrderPanelProps, 'position'>) => {
  const {state, setState, identifier} = props;
  const {show} = state;
  const position = usePositionSelector()[identifier] || {
    avgPx: 0,
    position: 0,
  };

  const handleClose = () => setState({...state, show: false});

  const setOrder = (order: DeepPartial<Order>) => {
    setState({...state, order: {...state.order, ...order}});
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom">
      <Offcanvas.Body>
        <Row className="g-3">
          <Col>
            <OrderList position={position} {...props}/>
          </Col>
          <Col className={styles['order-entry']}>
            <OrderEntry position={position} setOrder={setOrder} {...props}/>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
