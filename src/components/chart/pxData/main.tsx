import React from 'react';

import {LineStyle} from 'lightweight-charts';

import {PxData} from '../../../types/pxData';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartReturnData} from './type';
import {toBarData} from './utils';


type Props = Omit<TradingViewChartProps<PxData, PxChartReturnData>, 'initChart'>;

export const PxDataChart = ({...props}: Props) => {
  return (
    <TradingViewChart
      initChart={({chart, chartData}) => {
        const price = chart.addCandlestickSeries({
          title: chartData.contract.symbol,
          priceFormat: {
            minMove: chartData.contract.minTick,
          },
        });
        price.setData(chartData.data.map(toBarData));

        chartData.supportResistance.forEach(({level}) => {
          price.createPriceLine({
            price: level,
            axisLabelVisible: true,
            title: '',
            color: 'rgba(229, 37, 69, 1)',
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
          });
        });

        return {series: {price}};
      }}
      {...props}
    />
  );
};
