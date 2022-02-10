import React from 'react';

import {PxData} from '../../../types/pxData';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLegend} from './legend';
import {onPxChartInit} from './plot/onInit';
import {onPxChartUpdated} from './plot/onUpdate';
import {OnPxChartUpdatedEvent, PxChartLegendData, PxChartReturnData} from './type';


type Props = Omit<
  TradingViewChartProps<PxData, PxChartReturnData, PxChartLegendData>,
  'initChart' | 'calculateLegend' | 'getInitLegend' | 'renderLegendData'
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
      calculateLegend={(data) => {
        const lastPrice = data.data.at(-1);

        return {
          vwap: lastPrice?.vwap || NaN,
          close: lastPrice?.close || NaN,
        };
      }}
      renderLegendData={(legendData) => <PxChartLegend legendData={legendData}/>}
      {...props}
    />
  );
};
