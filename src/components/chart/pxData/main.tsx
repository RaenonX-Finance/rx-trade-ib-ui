import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit';
import {onPxChartUpdated} from './plot/onUpdate';
import {OnPxChartUpdatedEvent, PxChartLegendData, PxChartInitData} from './type';


type Props = Omit<
  TradingViewChartProps<PxData, PxChartInitData, PxChartLegendData>,
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
        legend: (data) => {
          const last = data.data.at(-1);

          return {
            decimals: getDecimalPlaces(data.contract.minTick),
            epochSec: NaN,
            open: NaN,
            high: NaN,
            low: NaN,
            close: NaN,
            vwap: NaN,
            ...last,
          };
        },
      }}
      renderObjects={{
        legend: (_, legend) => <PxChartLegend data={legend}/>,
      }}
      {...props}
    />
  );
};
