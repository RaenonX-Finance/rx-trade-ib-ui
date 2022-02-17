import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelCommonProps} from '../type';
import {calculateNewAvgPx, calculateNewOrderPx, calculatePnL, sideMultiplier} from '../utils';


type Props = OrderPanelCommonProps & {
  pxTick: number,
};

export const OrderPanelStats = ({order, setOrder, position, pxTick, multiplier}: Props) => {
  const {px, quantity, side} = order;
  const signedQuantity = quantity * sideMultiplier[side];
  const {avgPx, position: pos} = position;

  const [newAvgPx, setNewAvgPx] = React.useState(calculateNewAvgPx(avgPx, pos, px, signedQuantity));

  React.useEffect(() => {
    setNewAvgPx(calculateNewAvgPx(avgPx, pos, px, signedQuantity));
  }, [px, order]);

  return (
    <>
      <FloatingLabel label="Avg Px after placement" className="mb-3">
        <Form.Control
          size="lg"
          type="number"
          placeholder=""
          className="text-end"
          value={parseFloat(newAvgPx.toFixed(2))}
          onChange={(e) => {
            const avgPx = parseFloat(e.currentTarget.value);
            setNewAvgPx(avgPx);

            setOrder({px: forceMinTick(calculateNewOrderPx(avgPx, pos, avgPx, signedQuantity), pxTick)});
          }}
          onMouseOver={(e) => e.currentTarget.focus()}
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
