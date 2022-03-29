import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PnLData} from '../../types/pnl';
import {PxData} from '../../types/pxData';
import {PxChartPayload} from '../chart/pxData/type';
import {PnLPx} from './px';
import {PnLSummarySection} from './summary';
import {PnLCommonProps, PnLStats} from './type';


type Props = PnLCommonProps & {
  decimals: number,
  payload: PxChartPayload,
  pxData: PxData,
  twsPnL: PnLData | undefined,
};

export const PnL = ({decimals, payload, pxData, twsPnL, ...props}: Props) => {
  const {execution, position} = payload;
  const {data, contract} = pxData;

  const avgPx = position?.avgPx || null;
  const lastBar = data.at(-1);
  const lastRealizedExecution = execution?.slice().reverse().find(({realizedPnLSum}) => !!realizedPnLSum);
  const currentPx = lastBar?.close;
  const pxDiff = (avgPx && currentPx && position?.position) ?
    (currentPx - avgPx) * Math.sign(position.position) :
    null;

  // Use `useMemo()` to prevent re-render on PnL unchanged but re-creating PnLStats
  const stats: PnLStats = React.useMemo(() => ({
    avgPx,
    pxDiff: {
      val: pxDiff,
      swingRatio: (lastBar?.diffSma && pxDiff) ? pxDiff / lastBar.diffSma : null,
    },
    calculated: {
      unrealized: (pxDiff && position) ? pxDiff * Math.abs(position.position) * contract.multiplier : null,
      realized: lastRealizedExecution?.realizedPnLSum || null,
    },
    tws: twsPnL ? twsPnL : {
      realized: null,
      unrealized: null,
    },
  }), [avgPx, pxDiff, lastRealizedExecution, twsPnL]);

  const {calculated} = stats;

  return (
    <Row className="g-2 mb-2">
      <Col>
        <PnLPx stats={stats} decimals={decimals} {...props}/>
      </Col>
      <Col>
        <PnLSummarySection summary={calculated} icon={<i className="bi bi-calculator"/>} {...props}/>
      </Col>
    </Row>
  );
};
