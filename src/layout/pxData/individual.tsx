import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../../components/chart/pxData/main';
import {PxChartPayload} from '../../components/chart/pxData/type';
import {PxData} from '../../types/pxData';
import {PxExtrema} from './extrema/main';
import {PxLastDayDiff} from './lastDayDiff/main';
import {TradeLog} from './tradeLog/main';


export type PxDataIndividualProps = {
  pxData: PxData,
  payload: PxChartPayload,
  title: string
};

export const PxDataIndividual = ({pxData, payload, title}: PxDataIndividualProps) => {
  const {execution} = payload;

  return (
    <>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <h4 className="mb-0">
            {title}
          </h4>
        </Col>
        <Col>
          <Row className="g-2 text-end align-items-center">
            <Col>
              <PxExtrema data={pxData}/>
            </Col>
            <Col xs="auto">
              <PxLastDayDiff data={pxData}/>
            </Col>
            <Col xs="auto">
              {execution && <TradeLog executions={execution} symbol={pxData.contract.symbol}/>}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-0 mb-2">
        <Col>
          <PxDataChart
            title={title}
            chartData={pxData}
            payload={payload}
            height={600}
          />
        </Col>
      </Row>
    </>
  );
};
