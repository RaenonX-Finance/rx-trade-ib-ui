import React from 'react';

import {createChart, IChartApi} from 'lightweight-charts';

import {useLayout} from '../../../hooks/layout/main';
import {chartOptions} from './options';
import {ChartObjectRef, UseChartPayload, UseChartReturn} from './type';


export const useTradingViewChart = <T, R, L>({
  initChart,
  onDataUpdated,
}: UseChartPayload<T, R, L>): UseChartReturn<T, R, L> => {
  const chartRef = React.useRef<IChartApi>();
  const chartObjectRef = React.useRef<ChartObjectRef<R>>();
  const {dimension} = useLayout();

  const makeChart: UseChartReturn<T, R, L>['makeChart'] = (payload) => {
    const {chartContainer} = payload;

    chartRef.current = createChart(chartContainer, {
      ...chartOptions,
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });

    chartObjectRef.current = {
      chartContainer,
      initData: initChart({chartRef, chartObjectRef, ...payload}),
    };
  };

  React.useEffect(() => {
    if (!chartObjectRef.current || !chartRef.current) {
      return;
    }

    const {chartContainer} = chartObjectRef.current;

    chartRef.current.applyOptions({
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });

    onDataUpdated();
  }, [dimension]);

  return {makeChart, chartRef, chartObjectRef};
};
