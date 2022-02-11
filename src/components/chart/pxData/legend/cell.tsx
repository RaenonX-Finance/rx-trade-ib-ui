import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';


export type LegendDataCellProps = {
  title: string,
  value: number,
  decimals: number,
  large?: boolean,
  useValueClass?: 'neutral' | 'up' | 'down' | boolean,
};

export const LegendDataCell = ({title, value, decimals, large, useValueClass = false}: LegendDataCellProps) => {
  let valueClass = '';
  if (typeof useValueClass === 'string') {
    if (useValueClass === 'up') {
      valueClass = styles['val-up'];
    } else if (useValueClass === 'down') {
      valueClass = styles['val-down'];
    }
  } else if (useValueClass) {
    if (value > 0) {
      valueClass = styles['val-up'];
    } else if (value < 0) {
      valueClass = styles['val-down'];
    }
  }

  return (
    <Row className="align-self-end">
      <Col>{title}</Col>
      <Col xs="auto" className={`float-end ${large ? styles['price-lg'] : ''} ${valueClass}`}>
        {value.toFixed(decimals)}
      </Col>
    </Row>
  );
};
