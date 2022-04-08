import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../components/chart/pxData/main';
import {PxChartPayload} from '../components/chart/pxData/type';
import {PxExtrema} from '../components/extrema/main';
import {PxLastDayDiff} from '../components/lastDayDiff/main';
import {PnL} from '../components/pnl/main';
import {TradeLog} from '../components/tradeLog/main';
import {usePnLSelector} from '../state/pnl/selector';
import {PxData} from '../types/pxData';
import {getDecimalPlaces} from '../utils/calc';


export type PxDataIndividualProps = {
  pxData: PxData,
  payload: PxChartPayload,
  title: string
};

export const PxDataIndividual = ({pxData, payload, title}: PxDataIndividualProps) => {
  const pnlDict = usePnLSelector();

  const {execution} = payload;
  const decimals = getDecimalPlaces(pxData.contract.minTick);

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
              <PxLastDayDiff data={pxData} dataKey="lastDayClose" prefix="LC"/>
              <PxLastDayDiff data={pxData} dataKey="todayOpen" prefix="CO"/>
            </Col>
            <Col xs="auto">
              {execution && <TradeLog executions={execution} symbol={pxData.contract.symbol}/>}
            </Col>
          </Row>
        </Col>
      </Row>
      <hr className="my-2"/>
      {
        pnlDict.config &&
        <PnL
          decimals={decimals}
          twsPnL={undefined}
          pxData={pxData}
          payload={payload}
          config={pnlDict.config}
        />
      }
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
