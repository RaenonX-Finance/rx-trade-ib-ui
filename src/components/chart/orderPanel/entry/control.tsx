import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useSocket} from '../../../../hooks/socket/main';
import {OrderSide} from '../../../../types/common';
import {OrderSocketMessage} from '../../../../types/order';
import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelProps} from '../type';
import styles from './main.module.scss';


const signToSideForClose: {[sign in number]: OrderSide} = {
  [-1]: 'BUY',
  [1]: 'SELL',
};

export const OrderPanelControl = ({state, position}: OrderPanelProps) => {
  const socket = useSocket();
  const orderQty = state.order.quantity;
  const signedPosition = position ? position.position : 0;

  const disableBuy = signedPosition < 0 ? orderQty > -signedPosition : false;
  const disableSell = signedPosition > 0 ? orderQty > signedPosition : false;

  const onClick = (side: OrderSide, isMarket: boolean) => () => {
    const order: OrderSocketMessage = {
      ...state.order,
      px: isMarket ? null : forceMinTick(state.order.px, state.pxTick),
      side,
    };

    socket.emit('orderPlace', JSON.stringify(order));
  };

  const onClickToClose = () => {
    const order: OrderSocketMessage = {
      ...state.order,
      px: null,
      quantity: Math.abs(position.position),
      side: signToSideForClose[Math.sign(position.position)],
    };

    socket.emit('orderPlace', JSON.stringify(order));
  };

  return (
    <>
      <Row className="g-3">
        <Col>
          <Button
            variant="info"
            className={styles['control']}
            onClick={onClick('BUY', false)}
            disabled={disableBuy}
          >
            {disableBuy ? '-' : 'BUY'}
          </Button>
        </Col>
        <Col>
          <Button
            variant="danger"
            className={styles['control']}
            onClick={onClick('SELL', false)}
            disabled={disableSell}
          >
            {disableSell ? '-' : 'SELL'}
          </Button>
        </Col>
      </Row>
      <Row className="g-3">
        <Col>
          <Button variant="outline-info" className={styles['control']} onClick={onClick('BUY', true)}>
            Buy MKT
          </Button>
        </Col>
        <Col>
          <Button variant="outline-danger" className={styles['control']} onClick={onClick('SELL', true)}>
            Sell MKT
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            className={styles['control']}
            onClick={onClickToClose}
            disabled={position.position === 0}
          >
            Close MKT
          </Button>
        </Col>
      </Row>
    </>
  );
};
