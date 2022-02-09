import React from 'react';

import {IChartApi} from 'lightweight-charts';

import {PxData} from '../../types/pxData';
import {useCharts} from './hook';
import styles from './main.module.scss';


type Props = {
  data: PxData,
  onDataUpdated: (chart: IChartApi, data: PxData) => void,
};

export const TradingViewChart = ({data, onDataUpdated}: Props) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const {makeChart, chart} = useCharts();

  React.useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    makeChart(chartContainerRef.current, data);
  }, []);

  React.useEffect(() => {
    if (!chart) {
      return;
    }

    onDataUpdated(chart, data);
  }, [data]);

  return <div className={styles['chart-container']} ref={chartContainerRef}/>;
};
