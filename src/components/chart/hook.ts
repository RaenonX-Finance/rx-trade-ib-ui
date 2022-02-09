import React from 'react';

import {createChart, IChartApi, UTCTimestamp} from 'lightweight-charts';

import {useLayout} from '../../hooks/layout/main';
import {PxData} from '../../types/pxData';
import {chartOptions} from './options';


type UseChartsReturn = {
  makeChart: (element: HTMLElement, data: PxData) => void,
  chart?: IChartApi,
};

export const useCharts = (): UseChartsReturn => {
  const chartRef = React.useRef<{chart: IChartApi, element: HTMLElement}>();
  const {dimension} = useLayout();

  const makeChart: UseChartsReturn['makeChart'] = (element, data) => {
    const chart = createChart(element, {
      ...chartOptions,
      width: element.clientWidth,
      height: element.clientHeight,
    });

    const candlestickSeries = chart.addCandlestickSeries();

    candlestickSeries.setData(data.data.map((item) => ({time: item.epochSec as UTCTimestamp, ...item})));

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

  return {makeChart, chart: chartRef.current?.chart};
};
