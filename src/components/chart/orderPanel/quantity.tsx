import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from './main.module.scss';
import {OrderPanelCommonProps} from './type';


export const OrderPanelQuantity = ({order, setOrder}: OrderPanelCommonProps) => {
  return (
    <>
      {[1, 11].map((offset) => (
        <ButtonGroup key={offset} className="w-100 mb-3">
          {Array.from(Array(10).keys()).map((quantity) => {
            quantity += offset;

            return (
              <Button
                key={quantity}
                variant={quantity === order.quantity ? 'success' : 'secondary'}
                active={quantity === order.quantity}
                onClick={() => setOrder({quantity})}
                className="bg-gradient"
                style={{width: '10%'}}
              >
                <span className={styles['button-text']}>
                  {quantity}
                </span>
              </Button>
            );
          })}
          <br/>
        </ButtonGroup>
      ))}
    </>
  );
};
