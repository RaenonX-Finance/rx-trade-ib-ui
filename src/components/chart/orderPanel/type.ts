import React from 'react';

import {DeepPartial} from 'lightweight-charts';

import {SecurityIdentifier} from '../../../types/common';
import {Order} from '../../../types/order';
import {PositionData} from '../../../types/position';


export type OrderPanelState = {
  show: boolean,
  order: Order,
  pxTick: number,
};

export type OrderPanelProps = {
  state: OrderPanelState,
  setState: React.Dispatch<React.SetStateAction<OrderPanelState>>,
  position: PositionData,
  identifier: SecurityIdentifier,
};

export type OrderPanelPartProps = OrderPanelProps & {
  setOrder: (order: DeepPartial<Order>) => void,
};

export type OrderPanelCommonProps = {
  order: Order,
  setOrder: (order: DeepPartial<Order>) => void,
  position: PositionData,
};
