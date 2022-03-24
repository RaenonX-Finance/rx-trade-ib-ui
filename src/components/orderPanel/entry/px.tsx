import React from 'react';

import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {forceMinTick} from '../../../utils/calc';
import {OrderPanelCommonProps} from '../type';
import {StatsField} from './statsField';


type Props = OrderPanelCommonProps & {
  pxTick: number,
};

export const OrderPanelPx = ({order, setOrder, pxTick, position}: Props) => {
  const {px} = order;
  const {avgPx, position: pos} = position;

  return (
    <Row className="g-3">
      <Col xs={7}>
        <FloatingLabel label="Px" className="mb-3">
          <Form.Control
            size="lg"
            type="number"
            placeholder=""
            className="text-end"
            value={forceMinTick(px, pxTick)}
            onChange={(e) => (
              setOrder({px: forceMinTick(parseFloat(e.currentTarget.value), pxTick)})
            )}
            onMouseOver={(e) => e.currentTarget.focus()}
            step={pxTick}
          />
        </FloatingLabel>
      </Col>
      <Col xs={5}>
        <StatsField
          label="Px Diff"
          value={pos ? (px - avgPx).toFixed(2) : ''}
        />
      </Col>
    </Row>
  );
};
