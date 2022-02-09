import React from 'react';

import {createChart, IChartApi} from 'lightweight-charts';

import {useLayout} from '../../hooks/layout/main';
import {chartOptions} from './options';
import {ChartDefaultSeries, ChartInitializationHandler, UseChartsReturn} from './type';


export const useChart = (initChart: ChartInitializationHandler): UseChartsReturn => {
  const chartRef = React.useRef<{chart: IChartApi, element: HTMLElement}>();
  const {dimension} = useLayout();
  let series: ChartDefaultSeries | undefined = undefined;

  const makeChart: UseChartsReturn['makeChart'] = (element, data) => {
    const chart = createChart(element, {
      ...chartOptions,
      width: element.clientWidth,
      height: element.clientHeight,
    });

    series = initChart({chart, data});

    chartRef.current = {chart, element};
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

  if (chartRef.current && series) {
    return {makeChart, chart: chartRef.current.chart, series};
  } else {
    return {makeChart, chart: undefined, series: undefined};
  }
};
