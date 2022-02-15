import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OrderPanel} from '../orderPanel/main';
import {OrderPanelState} from '../orderPanel/type';
import {useTradingViewChart} from './hook';
import styles from './main.module.scss';
import {ChartCalcObjects, ChartDataUpdatedEventHandler, ChartInitEventHandler, ChartRenderObjects} from './type';


export type TradingViewChartProps<T, P, R, L> = {
  height: number,
  initChart: ChartInitEventHandler<T, R, L>,
  chartData: T,
  payload: P,
  onDataUpdated: ChartDataUpdatedEventHandler<T, P, R, L>,
  calcObjects: ChartCalcObjects<T, L>,
  renderObjects: ChartRenderObjects<T, L>,
};

export const TradingViewChart = <T, P, R, L>({
  height,
  initChart,
  calcObjects,
  chartData,
  payload,
  onDataUpdated,
  renderObjects,
}: TradingViewChartProps<T, P, R, L>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const [legend, setLegend] = React.useState<L>(calcObjects.legend(chartData));
  const [order, setOrder] = React.useState<OrderPanelState>(calcObjects.order(chartData));

  const setObject = {
    legend: setLegend,
    order: setOrder,
  };

  const onDataUpdatedInternal = () => {
    chartDataRef.current = chartData;
    onDataUpdated({chartDataRef, chartObjectRef, setObject, payload, order});
  };

  const onLoad = () => {
    if (!chartContainerRef.current) {
      return;
    }

    chartDataRef.current = chartData;
    makeChart({
      chartDataRef,
      setObject,
      chartContainer: chartContainerRef.current,
    });
  };

  const {makeChart, chartRef, chartObjectRef} = useTradingViewChart({
    initChart,
    onDataUpdated: onDataUpdatedInternal,
  });

  React.useEffect(onLoad, []);
  React.useEffect(onDataUpdatedInternal, [chartObjectRef.current?.initData, chartData, payload, order]);

  return (
    <>
      {order.show && <OrderPanel state={order} setState={setOrder}/>}
      <div className="mb-2" style={{height}} ref={chartContainerRef}>
        <div className={styles['legend']}>
          {renderObjects.legend(chartData, legend)}
        </div>
      </div>
      <Row className="g-0 text-end">
        <Col>
          <Button size="sm" variant="outline-success" className="me-2" onClick={() => {
            chartRef.current?.timeScale().scrollToRealTime();
          }}>
            To Realtime
          </Button>
          <Button size="sm" variant="outline-warning" onClick={() => {
            chartRef.current?.timeScale().resetTimeScale();
            chartRef.current?.priceScale().applyOptions({autoScale: true});
          }}>
            Reset Scales
          </Button>
        </Col>
      </Row>
    </>
  );
};
