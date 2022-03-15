import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {epochSecToFormattedString} from '../../../../utils/chart';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';


type Props = {
  legend: PxChartLegendData,
};

export const PxChartLegend = ({legend}: Props) => {
  const {
    ema120Trend,
    ema120TrendChange,
    open,
    high,
    low,
    close,
    diff,
    diffSma,
    diffSmaTrend,
    decimals,
    epochSec,
  } = legend;

  let diffClassName: LegendDataCellProps['useValueClass'] = 'neutral';
  if (ema120Trend) {
    if (ema120Trend > 0) {
      diffClassName = 'up';
    } else if (ema120Trend < 0) {
      diffClassName = 'down';
    }
  }

  return (
    <div className={`${styles['legend']} ${styles[`diff-${diffClassName}`]}`}>
      <Row>
        <Col className="d-inline">
          <LegendDataCell value={epochSecToFormattedString(epochSec)} decimals={decimals} large/>
          <LegendDataCell
            title={<i className="bi bi-arrows-expand"/>}
            value={ema120Trend} decimals={decimals} useValueClass
          />
          <LegendDataCell
            title={<i className="bi bi-plus-slash-minus"/>}
            value={ema120TrendChange} decimals={decimals} useValueClass
          />
          <LegendDataCell
            title={<i className="bi bi-activity"/>}
            value={diffSma} decimals={decimals}
          />
          <LegendDataCell
            title={<i className="bi bi-plus-slash-minus"/>}
            value={diffSmaTrend} decimals={decimals} useValueClass
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <LegendDataCell title="O" value={open} decimals={decimals}/>
          <LegendDataCell title="H" value={high} decimals={decimals}/>
          <LegendDataCell title="L" value={low} decimals={decimals}/>
          <LegendDataCell title="C" value={close} decimals={decimals}/>
          <LegendDataCell
            title={<i className="bi bi-plus-slash-minus"/>}
            value={diff} decimals={decimals} useValueClass
          />
        </Col>
      </Row>
    </div>
  );
};
