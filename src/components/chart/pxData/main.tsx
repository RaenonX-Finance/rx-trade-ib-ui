import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit';
import {onPxChartUpdated} from './plot/onUpdate';
import {OnPxChartUpdatedEvent, PxChartLegendData, PxChartReturnData} from './type';


type Props = Omit<
  TradingViewChartProps<PxData, PxChartReturnData, PxChartLegendData>,
  'initChart' | 'calcObjects' | 'renderObjects'
> & {
  onDataUpdated: (e: OnPxChartUpdatedEvent) => void,
};


export const PxDataChart = ({onDataUpdated, ...props}: Props) => {
  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={(e) => {
        onPxChartUpdated(e);
        onDataUpdated(e);
      }}
      calcObjects={{
        legend: (data) => ({
          epochSec: NaN,
          decimals: getDecimalPlaces(data.contract.minTick),
          open: NaN,
          high: NaN,
          low: NaN,
          close: NaN,
          vwap: NaN,
          ...data.data.at(-1),
        }),
      }}
      renderObjects={{
        legend: (_, legend) => <PxChartLegend data={legend}/>,
      }}
      {...props}
    />
  );
};
