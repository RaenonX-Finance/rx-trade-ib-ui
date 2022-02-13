import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {epochSecToFormattedString} from '../../../../utils/chart';
import {formatSignedNumber} from '../../../../utils/string';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';


type Props = {
  data: PxChartLegendData,
};

export const PxChartLegend = ({data}: Props) => {
  const {vwap, open, high, low, close, decimals, epochSec} = data;

  let vwapClassName: LegendDataCellProps['useValueClass'];
  const vwapDiff = close - vwap;
  if (vwapDiff > 0) {
    vwapClassName = 'up';
  } else if (vwapDiff < 0) {
    vwapClassName = 'down';
  } else {
    vwapClassName = 'neutral';
  }

  const diff = close - open;
  const diffUp = diff > 0;

  return (
    <div className={`${styles['legend']} ${styles[`vwap-${vwapClassName}`]}`}>
      <LegendDataCell title="VWAP" value={vwap} decimals={2} useValueClass={vwapClassName}/>
      <LegendDataCell title="O" value={open} decimals={decimals}/>
      <LegendDataCell title="H" value={high} decimals={decimals}/>
      <LegendDataCell title="L" value={low} decimals={decimals}/>
      <LegendDataCell title="C" value={close} decimals={decimals} large/>
      <Row>
        <Col className={`${diffUp ? styles['val-up'] : styles['val-down']} text-end`}>
          {formatSignedNumber(diff, decimals)}
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          {epochSecToFormattedString(epochSec)}
        </Col>
      </Row>
    </div>
  );
};
