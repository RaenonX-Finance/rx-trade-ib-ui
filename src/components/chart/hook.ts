import React from 'react';

import {createChart} from 'lightweight-charts';

import {useLayout} from '../../hooks/layout/main';
import {chartOptions} from './options';
import {ChartInitializationHandler, ChartRef, UseChartsReturn} from './type';


export const useChart = (initChart: ChartInitializationHandler): UseChartsReturn => {
  const chartRef = React.useRef<ChartRef>();
  const {dimension} = useLayout();

  const makeChart: UseChartsReturn['makeChart'] = (element, data) => {
    const chart = createChart(element, {
      ...chartOptions,
      width: element.clientWidth,
      height: element.clientHeight,
    });

    const series = initChart({chart, data});

    chartRef.current = {chart, series, element};
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

  if (chartRef.current) {
    return {makeChart, ...chartRef.current};
  } else {
    return {makeChart, chart: undefined, series: undefined};
  }
};
