import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './legend.module.scss';
import {PxChartLegendData} from './type';


type Props = {
  data: PxChartLegendData,
};

export const PxChartLegend = ({data}: Props) => {
  const {vwap, open, high, low, close, decimals} = data;

  let vwapClassName: string;
  const vwapDiff = close - vwap;
  if (vwapDiff > 0) {
    vwapClassName = styles['vwap-buy'];
  } else if (vwapDiff < 0) {
    vwapClassName = styles['vwap-sell'];
  } else {
    vwapClassName = styles['vwap-neutral'];
  }

  const diff = close - open;
  const diffUp = diff > 0;

  const DataCell = ({title, value, large}: {title: string, value: number, large?: boolean}) => (
    <Row>
      <Col>{title}</Col>
      <Col className={`float-end ${large ? styles['price-lg'] : ''}`}>{value.toFixed(decimals)}</Col>
    </Row>
  );

  return (
    <div className={`${styles['legend']} ${vwapClassName}`}>
      <span className={styles['vwap']}>
        VWAP&nbsp;
        <span className={styles['vwap-text']}>{vwap.toFixed(2)}</span>
      </span><br/>
      <DataCell title="O" value={open}/>
      <DataCell title="H" value={high}/>
      <DataCell title="L" value={low}/>
      <DataCell title="C" value={close} large/>
      <Row>
        <Col className={`${diffUp ? styles['diff-up'] : styles['diff-down']} text-end`}>
          {diffUp ? '+' : ''}{diff.toFixed(decimals)}
        </Col>
      </Row>
    </div>
  );
};
