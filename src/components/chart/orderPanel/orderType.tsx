import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import {OrderType, orderTypeText} from '../../../types/common';
import {OrderPanelCommonProps} from './type';


export const OrderEntryType = ({order, setOrder}: OrderPanelCommonProps) => {
  return (
    <>
      <h4>Order Type</h4>
      <ButtonGroup className="w-100">
        {Object.entries(orderTypeText).map(([type, text], idx) => (
          <ToggleButton
            key={idx}
            id={`type-${idx}`}
            type="radio"
            variant={type === order.type ? 'primary' : 'secondary'}
            name="radio"
            value={type}
            checked={type === order.type}
            onChange={(e) => setOrder({
              type: e.currentTarget.value as OrderType,
            })}
            className="bg-gradient"
          >
            <h4 className="mb-0">
              {text}
            </h4>
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
};
