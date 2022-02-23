import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLegendData, PxChartPayload} from './type';


type Props = Omit<
  TradingViewChartProps<PxData, PxChartPayload, PxChartInitData, PxChartLegendData>,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec'
>;


export const PxDataChart = (props: Props) => {
  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={(e) => onPxChartUpdated(e)}
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
            amplitudeHL: NaN,
            amplitudeOC: NaN,
            ema120: NaN,
            ...last,
          };
        },
        order: (data) => ({
          show: false,
          order: {
            side: 'BUY',
            quantity: 1,
            px: NaN,
            identifier: NaN,
          },
          pxTick: data.contract.minTick,
        }),
      }}
      renderObjects={{
        legend: (_, legend) => <PxChartLegend data={legend}/>,
      }}
      getIdentifier={(data) => data.contract.identifier}
      getPnLMultiplier={(data) => data.contract.multiplier}
      getPeriodSec={(data) => data.periodSec}
      {...props}
    />
  );
};
