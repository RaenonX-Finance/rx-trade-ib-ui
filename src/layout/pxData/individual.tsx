import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../../components/chart/pxData/main';
import {PxChartPayload} from '../../components/chart/pxData/type';
import {PxData} from '../../types/pxData';
import {TradeLog} from './tradeLog/main';


type Props = {
  pxData: PxData,
  payload: PxChartPayload,
};

export const PriceDataIndividual = ({pxData, payload}: Props) => {
  const {execution} = payload;

  return (
    <div>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <h3>{pxData.contract.symbol}&nbsp;({(pxData.periodSec / 60).toFixed(0)})</h3>
        </Col>
        <Col className="text-end">
          {execution && <TradeLog executions={execution} symbol={pxData.contract.symbol}/>}
        </Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col>
          <PxDataChart
            chartData={pxData}
            payload={payload}
            height={370}
          />
        </Col>
      </Row>
    </div>
  );
};
