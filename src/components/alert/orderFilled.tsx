import React from 'react';

import Alert from 'react-bootstrap/Alert';
import {Variant} from 'react-bootstrap/types';

import {OrderSide} from '../../types/common';
import {OrderFilledResult} from '../../types/orderFilled';
import styles from './main.module.scss';


const actionToVariant: {[side in OrderSide]: Variant} = {
  BUY: 'info',
  SELL: 'danger',
};

type Props = {
  data: OrderFilledResult,
};

export const OrderFilledAlert = ({data}: Props) => {
  const {symbol, quantity, action, fillPx} = data;

  return (
    <Alert variant={actionToVariant[action]} className={styles['order-filled-alert']}>
      {`${symbol} ${action} ${fillPx.toFixed(2)} x ${quantity}`}
    </Alert>
  );
};
