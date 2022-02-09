import React from 'react';

import {LineStyle} from 'lightweight-charts';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useChart} from '../../../components/chart/hook';
import {TradingViewChart} from '../../../components/chart/main';
import {toBarData} from '../../../components/chart/utils';
import {PxData} from '../../../types/pxData';
import styles from './individual.module.scss';


type Props = {
  data: PxData,
};

export const PriceDataIndividual = ({data}: Props) => {
  const chartHook = useChart(({chart, data}) => {
    const price = chart.addCandlestickSeries({
      title: data.contract.symbol,
      priceFormat: {
        minMove: data.contract.minTick,
      },
    });
    price.setData(data.data.map(toBarData));

    price.createPriceLine({
      price: 75,
      axisLabelVisible: true,
      title: 'S/R',
      color: 'rgba(229, 37, 69, 1)',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });

    return {price};
  });

  return (
    <div>
      <h4>{data.contract.symbol}</h4>
      <Row className={`g-0 mb-2 ${styles['data-section']}`}>
        <Col>
          <TradingViewChart
            chartHook={chartHook}
            data={data}
            onDataUpdated={({series, data}) => {
              const {price} = series;
              const lastPrice = data.data.at(-1);

              if (lastPrice) {
                price.update(toBarData(lastPrice));
              }

              console.log('updated', data.contract.symbol);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
