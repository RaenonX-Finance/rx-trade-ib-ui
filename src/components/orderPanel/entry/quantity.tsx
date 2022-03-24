import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {ButtonVariant} from 'react-bootstrap/types';

import {PositionData} from '../../../types/position';
import {OrderPanelCommonProps} from '../type';
import styles from './main.module.scss';


type Props = OrderPanelCommonProps & {
  position: PositionData | undefined,
};

export const OrderPanelQuantity = ({order, setOrder, position}: Props) => {
  const signedPosition = position ? position.position : 0;
  const posQuantity = position ? Math.abs(signedPosition) : 0;

  const getVariantByPositionSide = (position: number): ButtonVariant => {
    return position > 0 ? 'info' : 'danger';
  };

  return (
    <ButtonGroup className="w-100 mb-3">
      {Array.from(Array(5).keys()).map((quantity) => {
        quantity += 1;

        return (
          <Button
            key={quantity}
            variant={(
              quantity === order.quantity ?
                'light' :
                (quantity === posQuantity ? getVariantByPositionSide(signedPosition) : 'secondary')
            )}
            active={quantity === order.quantity}
            onClick={() => setOrder({quantity})}
            className="bg-gradient"
            style={{width: '20%'}}
            size="lg"
          >
            <span className={styles['button-text']}>
              {quantity}
            </span>
          </Button>
        );
      })}
      <br/>
    </ButtonGroup>
  );
};
