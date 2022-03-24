import React from 'react';

import {DeepPartial} from 'lightweight-charts';

import {SecurityIdentifier} from '../../types/common';
import {Order} from '../../types/order';
import {PositionData} from '../../types/position';


export type OrderPanelInfo = Omit<Order, 'side'>;

export type OrderPanelState = {
  show: boolean,
  order: OrderPanelInfo,
  pxTick: number,
};

export type OrderPanelProps = {
  state: OrderPanelState,
  setState: React.Dispatch<React.SetStateAction<OrderPanelState>>,
  position: PositionData,
  identifier: SecurityIdentifier,
  multiplier: number,
  periodSec: number,
};

export type OrderPanelPartProps = OrderPanelProps & {
  setOrder: (order: DeepPartial<Order>) => void,
};

export type OrderPanelCommonProps = {
  order: OrderPanelInfo,
  setOrder: (order: DeepPartial<Order>) => void,
  position: PositionData,
  multiplier: number,
};
