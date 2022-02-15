import React from 'react';

import {DeepPartial} from 'lightweight-charts';

import {Order} from '../../../types/order';


export type OrderPanelState = {
  show: boolean,
  order: Order,
  pxTick: number,
};

export type OrderPanelProps = {
  state: OrderPanelState,
  setState: React.Dispatch<React.SetStateAction<OrderPanelState>>,
};

export type OrderPanelCommonProps = {
  order: Order,
  setOrder: (order: DeepPartial<Order>) => void,
};
