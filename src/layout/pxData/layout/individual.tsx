import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {TradingViewChart} from '../../../components/chart/main';
import {PxData} from '../../../types/pxData';


type Props = {
  data: PxData,
};

export const PriceDataIndividual = ({data}: Props) => {
  return (
    <>
      <h4>{data.symbol}</h4>
      <TradingViewChart
        data={data}
        onDataUpdated={(chart, data) => {
          chart.timeScale().resetTimeScale();
        }}
      />
    </>
  );
};
