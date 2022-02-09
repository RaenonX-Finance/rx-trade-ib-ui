import React from 'react';

import {IChartApi} from 'lightweight-charts';

import {PxData} from '../../types/pxData';
import styles from './main.module.scss';
import {ChartDefaultSeries, UseChartsReturn} from './type';


type OnDataUpdatedEvent = {
  chart: IChartApi,
  series: ChartDefaultSeries,
  data: PxData
};

type Props = {
  chartHook: UseChartsReturn,
  data: PxData,
  onDataUpdated: (e: OnDataUpdatedEvent) => void,
};

export const TradingViewChart = ({chartHook, data, onDataUpdated}: Props) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const {makeChart, chart, series} = chartHook;

  React.useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    makeChart(chartContainerRef.current, data);
  }, []);

  React.useEffect(() => {
    if (!chart || !series) {
      return;
    }

    onDataUpdated({chart, series, data});
  }, [data]);

  return <div className={styles['chart-container']} ref={chartContainerRef}/>;
};
