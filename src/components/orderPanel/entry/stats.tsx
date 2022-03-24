import React from 'react';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';

import {OrderPanelCommonProps} from '../type';
import {calculateNewAvgPx, calculatePnL} from '../utils';
import {StatsField} from './statsField';


type Props = OrderPanelCommonProps & {
  pxTick: number,
};

export const OrderPanelStats = ({order, position, multiplier}: Props) => {
  const {px, quantity} = order;
  const {avgPx, position: pos} = position;

  return (
    <>
      <Row className="g-3">
        <Col>
          <StatsField
            label="Avg Px (Buy)"
            value={parseFloat(calculateNewAvgPx(avgPx, pos, px, quantity).toFixed(2))}
          />
        </Col>
        <Col>
          <StatsField
            label="Avg Px (Sell)"
            value={parseFloat(calculateNewAvgPx(avgPx, pos, px, -quantity).toFixed(2))}
          />
        </Col>
      </Row>
      <Row className="g-3">
        <Col>
          <StatsField
            label="PnL (Buy)"
            value={calculatePnL(avgPx, pos, px, quantity, multiplier)?.toFixed(2) || ''}
          />
        </Col>
        <Col>
          <StatsField
            label="PnL (Sell)"
            value={calculatePnL(avgPx, pos, px, -quantity, multiplier)?.toFixed(2) || ''}
          />
        </Col>
      </Row>
    </>
  );
};
