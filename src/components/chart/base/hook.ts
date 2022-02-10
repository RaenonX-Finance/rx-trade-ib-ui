import React from 'react';

import {createChart} from 'lightweight-charts';

import {useLayout} from '../../../hooks/layout/main';
import {chartOptions} from './options';
import {ChartInitEventHandler, ChartRef, UseChartReturn} from './type';


export const useTradingViewChart = <T, R = null>(
  initChart: ChartInitEventHandler<T, R>,
): UseChartReturn<T, R> => {
  const chartRef = React.useRef<ChartRef<R>>();
  const {dimension} = useLayout();

  const makeChart: UseChartReturn<T, R>['makeChart'] = (element, chartData) => {
    const chart = createChart(element, {
      ...chartOptions,
      width: element.clientWidth,
      height: element.clientHeight,
    });

    chartRef.current = {chart, element, initData: initChart({chart, chartData})};
  };

  React.useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const {chart, element} = chartRef.current;

    chart.applyOptions({
      width: element.clientWidth,
      height: element.clientHeight,
    });
  }, [dimension]);

  return {makeChart, ...chartRef.current};
};
