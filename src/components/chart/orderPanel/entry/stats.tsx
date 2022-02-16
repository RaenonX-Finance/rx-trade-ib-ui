import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {OrderSide} from '../../../../types/common';
import {PositionData} from '../../../../types/position';
import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelCommonProps} from '../type';


type Props = OrderPanelCommonProps & {
  pxTick: number,
  position: PositionData | undefined,
};

const sideMultiplier: {[side in OrderSide]: number} = {
  BUY: 1,
  SELL: -1,
};

export const OrderPanelStats = ({order, setOrder, position, pxTick}: Props) => {
  const {px, quantity, side} = order;
  const signedQuantity = quantity * sideMultiplier[side];
  const {avgPx, position: pos} = position || {
    avgPx: 0,
    position: 0,
  };

  const calculateNewAvgPx = React.useCallback((
    currentAvgPx: number,
    position: number,
    orderPx: number,
    signedQuantity: number,
  ): number => {
    const positionsAfter = position + signedQuantity;

    if (positionsAfter === 0) {
      return 0;
    } else if (positionsAfter * position < 0) {
      // Switched side
      return orderPx;
    }

    return (currentAvgPx * position + orderPx * signedQuantity) / (position + signedQuantity);
  }, []);

  const calculateNewOrderPx = React.useCallback((
    currentAvgPx: number,
    position: number,
    newAvgPx: number,
    signedQuantity: number,
  ): number => {
    const positionsAfter = position + signedQuantity;

    if (positionsAfter === 0) {
      return 0;
    } else if (positionsAfter * position < 0) {
      // Switched side
      return newAvgPx;
    }

    return (-currentAvgPx * position + newAvgPx * (signedQuantity + position)) / signedQuantity;
  }, []);

  const [newAvgPx, setNewAvgPx] = React.useState(calculateNewAvgPx(avgPx, pos, px, signedQuantity));

  React.useEffect(() => {
    setNewAvgPx(calculateNewAvgPx(avgPx, pos, px, signedQuantity));
  }, [px, order]);

  return (
    <FloatingLabel label="Avg Px after placement" className="mb-3">
      <Form.Control
        size="lg"
        type="number"
        placeholder=""
        value={parseFloat(newAvgPx.toFixed(2))}
        onChange={(e) => {
          const avgPx = parseFloat(e.currentTarget.value);
          setNewAvgPx(avgPx);

          setOrder({px: forceMinTick(calculateNewOrderPx(avgPx, pos, avgPx, signedQuantity), pxTick)});
        }}
        onMouseOver={(e) => e.currentTarget.focus()}
      />
    </FloatingLabel>
  );
};
