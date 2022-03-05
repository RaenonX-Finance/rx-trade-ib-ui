import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {PxExtremaItem} from './item';


type Props = {
  data: PxData,
};

export const PxExtrema = ({data}: Props) => {
  const {swing, swingAmplRatio, duration} = data.extrema.current;

  const decimals = getDecimalPlaces(data.contract.minTick);

  return (
    <Row className="g-1 justify-content-end">
      <Col xs="auto">
        <PxExtremaItem icon={<i className="bi bi-plus-slash-minus"/>} data={swing} decimals={decimals}/>
      </Col>
      <Col xs="auto">
        <PxExtremaItem icon={<i className="bi bi-activity"/>} data={swingAmplRatio} decimals={3} suffix="x"/>
      </Col>
      <Col xs="auto">
        <PxExtremaItem icon={<i className="bi bi-stopwatch"/>} data={duration} decimals={0}/>
      </Col>
    </Row>
  );
};
