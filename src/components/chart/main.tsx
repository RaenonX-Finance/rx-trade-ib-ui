import React from 'react';

import {IChartApi, LineStyle} from 'lightweight-charts';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../types/pxData';
import {useChart} from './hook';
import {ChartDefaultSeries} from './type';
import {toBarData} from './utils';


type OnDataUpdatedEvent = {
  chart: IChartApi,
  series: ChartDefaultSeries,
  data: PxData
};

type Props = {
  data: PxData,
  height: number,
  onDataUpdated: (e: OnDataUpdatedEvent) => void,
};

export const TradingViewChart = ({data, height, onDataUpdated}: Props) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const {makeChart, chart, series} = useChart(({chart, data}) => {
    const price = chart.addCandlestickSeries({
      title: data.contract.symbol,
      priceFormat: {
        minMove: data.contract.minTick,
      },
    });
    price.setData(data.data.map(toBarData));

    data.supportResistance.forEach(({level}) => {
      price.createPriceLine({
        price: level,
        axisLabelVisible: true,
        title: '',
        color: 'rgba(229, 37, 69, 1)',
        lineWidth: 2,
        lineStyle: LineStyle.Dotted,
      });
    });

    return {price};
  });

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
