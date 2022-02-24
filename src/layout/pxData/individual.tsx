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

  const title = `${pxData.contract.symbol} - ${(pxData.periodSec / 60).toFixed(0)}`;

  return (
    <div>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <h4 className="mb-0">
            {title}
          </h4>
        </Col>
        <Col className="text-end">
          {execution && <TradeLog executions={execution} symbol={pxData.contract.symbol}/>}
        </Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col>
          <PxDataChart
            title={title}
            chartData={pxData}
            payload={payload}
            height={370}
          />
        </Col>
      </Row>
    </div>
  );
};
