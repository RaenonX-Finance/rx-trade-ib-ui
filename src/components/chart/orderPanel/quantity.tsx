import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {OrderPanelCommonProps} from './type';


export const OrderEntryQuantity = ({order, setOrder}: OrderPanelCommonProps) => {
  return (
    <FloatingLabel label="Quantity">
      <Form.Control
        size="lg"
        type="number"
        placeholder=""
        value={order.quantity}
        onChange={(e) => (
          setOrder({quantity: Math.max(1, Math.min(10, parseInt(e.currentTarget.value)))})
        )}
        max={10}
        min={1}
      />
    </FloatingLabel>
  );
};
