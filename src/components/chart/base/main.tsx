import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useTradingViewChart} from './hook';
import styles from './main.module.scss';
import {ChartDataUpdatedEventHandler, ChartInitCalculateLegend, ChartInitEventHandler} from './type';


export type TradingViewChartProps<T, R, L> = {
  height: number,
  initChart: ChartInitEventHandler<T, R, L>,
  chartData: T,
  onDataUpdated: ChartDataUpdatedEventHandler<T, R, L>,
  calculateLegend: ChartInitCalculateLegend<T, L>,
  renderLegendData: (legendData: L) => React.ReactNode,
};

export const TradingViewChart = <T, R, L>({
  height,
  initChart,
  calculateLegend,
  chartData,
  onDataUpdated,
  renderLegendData,
}: TradingViewChartProps<T, R, L>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const [legend, setLegend] = React.useState<L>(calculateLegend(chartData));

  const {makeChart, chart, initData} = useTradingViewChart({
    initChart, calculateLegend, setLegend,
  });

  React.useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    chartDataRef.current = chartData;
    makeChart({chartDataRef, setLegend, element: chartContainerRef.current});
  }, []);

  React.useEffect(() => {
    if (!chart || !initData) {
      return;
    }

    chartDataRef.current = chartData;
    onDataUpdated({chart, chartDataRef, initData, setLegend});
  }, [initData, chartData]);

  return (
    <>
      <div className="mb-2" style={{height}} ref={chartContainerRef}>
        <div className={styles['legend']}>
          {renderLegendData(legend)}
        </div>
      </div>
      <Row className="g-0 text-end">
        <Col>
          <Button size="sm" variant="outline-success" className="me-2" onClick={() => {
            chart?.timeScale().scrollToRealTime();
          }}>
            To Realtime
          </Button>
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
