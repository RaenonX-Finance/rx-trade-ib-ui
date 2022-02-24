import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLayoutConfigPanel} from './layoutConfig/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {
  PxChartInitData,
  PxChartLayoutConfig,
  PxChartLegendData,
  PxChartPayload,
} from './type';


type Props = Omit<
  TradingViewChartProps<
    PxData,
    PxChartPayload,
    PxChartInitData,
    PxChartLegendData,
    PxChartLayoutConfig
  >,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'renderLayoutConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec' |
  'getInitialLayoutConfig'
> & {
  title: string,
};


export const PxDataChart = (props: Props) => {
  const {title} = props;

  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={onPxChartUpdated}
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
      renderLayoutConfig={(config, setConfig) => (
        <PxChartLayoutConfigPanel title={title} config={config} setConfig={setConfig}/>
      )}
      getIdentifier={(data) => data.contract.identifier}
      getPnLMultiplier={(data) => data.contract.multiplier}
      getPeriodSec={(data) => data.periodSec}
      getInitialLayoutConfig={(data) => ({
        ema120: {
          title: 'EMA 120',
          enable: true,
        },
        srLevel: {
          title: 'S/R Levels',
          enable: data.periodSec <= 60,
        },
        marker: {
          title: 'Trade Markers',
          enable: data.periodSec <= 60,
        },
      })}
      {...props}
    />
  );
};
