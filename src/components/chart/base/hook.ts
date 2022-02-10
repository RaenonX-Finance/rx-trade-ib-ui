import React from 'react';

import {createChart} from 'lightweight-charts';

import {useLayout} from '../../../hooks/layout/main';
import {chartOptions} from './options';
import {ChartRef, UseChartPayload, UseChartReturn} from './type';


export const useTradingViewChart = <T, R, L>({
  initChart,
  calculateLegend,
  setLegend,
}: UseChartPayload<T, R, L>): UseChartReturn<T, R, L> => {
  const chartRef = React.useRef<ChartRef<R>>();
  const {dimension} = useLayout();

  const makeChart: UseChartReturn<T, R, L>['makeChart'] = ({element, chartDataRef}) => {
    const chart = createChart(element, {
      ...chartOptions,
      width: element.clientWidth,
      height: element.clientHeight,
    });

    chartRef.current = {chart, element, initData: initChart({chart, chartDataRef, setLegend})};

    return calculateLegend(chartDataRef.current);
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
