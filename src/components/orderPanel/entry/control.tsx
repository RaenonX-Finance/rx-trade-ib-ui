import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useSocket} from '../../../hooks/socket/main';
import {OrderSide} from '../../../types/common';
import {OrderSocketMessage} from '../../../types/order';
import {forceMinTick} from '../../../utils/calc';
import {OrderPanelProps} from '../type';
import styles from './main.module.scss';


export const OrderPanelControl = ({state, position}: OrderPanelProps) => {
  const socket = useSocket();
  const orderQty = state.order.quantity;
  const signedPosition = position ? position.position : 0;

  const disableBuy = signedPosition < 0 ? orderQty > -signedPosition : false;
  const disableSell = signedPosition > 0 ? orderQty > signedPosition : false;

  const onClick = (side: OrderSide, isMarket: boolean, isForcedBracket = false) => () => {
    const order: OrderSocketMessage = {
      ...state.order,
      px: isMarket ? null : forceMinTick(state.order.px, state.pxTick),
      side,
      forceBracket: isForcedBracket,
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
          <Button
            variant="outline-info"
            className={styles['control']}
            onClick={onClick('BUY', false, true)}
          >
            Buy BK
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-danger"
            className={styles['control']}
            onClick={onClick('SELL', false, true)}
          >
            Sell BK
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
    </>
  );
};
