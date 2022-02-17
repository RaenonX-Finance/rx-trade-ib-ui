import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {OrderPanelCommonProps} from '../type';
import {calculateNewAvgPx, calculatePnL, sideMultiplier} from '../utils';


type Props = OrderPanelCommonProps & {
  pxTick: number,
};

export const OrderPanelStats = ({order, position, multiplier}: Props) => {
  const {px, quantity, side} = order;
  const signedQuantity = quantity * sideMultiplier[side];
  const {avgPx, position: pos} = position;

  return (
    <>
      <FloatingLabel label="Avg Px after placement" className="mb-3">
        <Form.Control
          size="lg"
          type="number"
          placeholder=""
          className="text-end"
          value={parseFloat(calculateNewAvgPx(avgPx, pos, px, signedQuantity).toFixed(2))}
          disabled
        />
      </FloatingLabel>
      <FloatingLabel label="PnL" className="mb-3">
        <Form.Control
          size="lg"
          type="number"
          placeholder=""
          className="text-end"
          value={calculatePnL(avgPx, pos, px, signedQuantity, multiplier)?.toFixed(2) || ''}
          disabled
        />
      </FloatingLabel>
    </>
  );
};
