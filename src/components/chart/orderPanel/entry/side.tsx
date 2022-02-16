import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {ButtonVariant} from 'react-bootstrap/types';

import {OrderSide, orderSideText} from '../../../../types/common';
import {OrderPanelCommonProps} from '../type';
import styles from './main.module.scss';


const sideToVariant: {[side in OrderSide]: ButtonVariant} = {
  BUY: 'info',
  SELL: 'danger',
};

export const OrderPanelSide = ({order, setOrder}: OrderPanelCommonProps) => {
  return (
    <ButtonGroup className="w-100 mb-3">
      {Object.entries(orderSideText).map(([side, text], idx) => (
        <ToggleButton
          key={idx}
          id={`side-${idx}`}
          type="radio"
          variant={side === order.side ? sideToVariant[side] : 'secondary'}
          name="radio"
          value={side}
          checked={side === order.side}
          onChange={(e) => setOrder({
            side: e.currentTarget.value as OrderSide,
          })}
          className="bg-gradient"
          size="sm"
        >
          <span className={styles['button-text']}>
            {text}
          </span>
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};
