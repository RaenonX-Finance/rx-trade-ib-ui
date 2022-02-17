import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {SocketContext} from '../../../../layout/socket/socket';
import {OrderSocketMessage} from '../../../../types/order';
import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelProps} from '../type';
import styles from './main.module.scss';


export const OrderPanelControl = ({state, setState}: OrderPanelProps) => {
  const socket = React.useContext(SocketContext);

  if (!socket) {
    return <></>;
  }

  const onClick = (isMarket: boolean) => () => {
    const order: OrderSocketMessage = state.order;

    if (isMarket) {
      order.px = null;
    } else {
      order.px = forceMinTick(state.order.px, state.pxTick);
    }

    socket.emit('orderPlace', JSON.stringify(order));
    setState({...state, show: false});
  };

  return (
    <>
      <Row>
        <Col>
          <Button variant="outline-danger" className={styles['control']} onClick={onClick(true)}>
            Submit MKT
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" className={styles['control']} onClick={onClick(false)}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};
