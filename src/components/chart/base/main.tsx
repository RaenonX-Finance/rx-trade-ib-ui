import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useTradingViewChart} from './hook';
import {ChartDataUpdatedEventHandler, ChartInitEventHandler} from './type';


export type TradingViewChartProps<T, R> = {
  height: number,
  initChart: ChartInitEventHandler<T, R>,
  chartData: T,
  onDataUpdated: ChartDataUpdatedEventHandler<T, R>,
};

export const TradingViewChart = <T, R>({height, initChart, chartData, onDataUpdated}: TradingViewChartProps<T, R>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const {makeChart, chart, initData} = useTradingViewChart(initChart);

  React.useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    makeChart(chartContainerRef.current, chartData);
  }, []);

  React.useEffect(() => {
    if (!chart || !initData) {
      return;
    }

    onDataUpdated({chart, chartData, initData});
  }, [initData, chartData]);

  return (
    <>
      <div className="mb-2" style={{height}} ref={chartContainerRef}/>
      <Row className="g-0 text-end">
        <Col>
          <Button size="sm" variant="outline-warning" onClick={() => {
            chart?.timeScale().resetTimeScale();
            chart?.priceScale().applyOptions({autoScale: true});
          }}>
            Reset Scales
          </Button>
        </Col>
      </Row>
    </>
  );
};
