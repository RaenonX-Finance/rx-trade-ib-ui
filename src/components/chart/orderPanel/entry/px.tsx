import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelCommonProps} from '../type';


type Props = OrderPanelCommonProps & {
  pxTick: number,
};

export const OrderPanelPx = ({order, setOrder, pxTick}: Props) => {
  return (
    <FloatingLabel label="Px" className="mb-3">
      <Form.Control
        size="lg"
        type="number"
        placeholder=""
        className="text-end"
        value={forceMinTick(order.px, pxTick)}
        onChange={(e) => (
          setOrder({px: forceMinTick(parseFloat(e.currentTarget.value), pxTick)})
        )}
        onMouseOver={(e) => e.currentTarget.focus()}
        step={pxTick}
      />
    </FloatingLabel>
  );
};
