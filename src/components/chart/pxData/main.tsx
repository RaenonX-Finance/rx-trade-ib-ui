import React from 'react';

import {PxData} from '../../../types/pxData';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {OnChartDataUpdatedEvent} from '../base/type';
import {onPxChartInit} from './plot/onInit';
import {onPxChartUpdated} from './plot/onUpdate';
import {PxChartReturnData} from './type';


type Props = Omit<TradingViewChartProps<PxData, PxChartReturnData>, 'initChart'> & {
  onDataUpdated: (e: OnChartDataUpdatedEvent<PxData, PxChartReturnData>) => void,
};


export const PxDataChart = ({onDataUpdated, ...props}: Props) => {
  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={(e) => {
        onPxChartUpdated(e);
        onDataUpdated(e);
      }}
      {...props}
    />
  );
};
