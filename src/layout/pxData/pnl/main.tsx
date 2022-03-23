import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PnLPx} from './px';
import {PnLSummarySection} from './summary';
import {PnLStats} from './type';


const stats: PnLStats = {
  avgPx: 14659,
  pxDiff: {
    val: -20,
    swingRatio: 2,
  },
  calculated: {
    unrealized: -50,
    realized: 500,
  },
  tws: {
    unrealized: -58,
    realized: 580,
  },
};

type Props = {
  decimals: number,
};

export const PnL = (props: Props) => {
  const {calculated, tws} = stats;

  return (
    <Row className="g-2 mb-2">
      <Col>
        <PnLPx stats={stats} {...props}/>
      </Col>
      <Col>
        <PnLSummarySection summary={calculated} icon={<i className="bi bi-calculator"/>}/>
      </Col>
      <Col>
        <PnLSummarySection summary={tws} icon={<i className="bi bi-laptop"/>}/>
      </Col>
    </Row>
  );
};
