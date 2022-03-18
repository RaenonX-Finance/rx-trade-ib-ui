import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../../types/pxData';
import {epochSecToFormattedString} from '../../../../utils/chart';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';
import {LegendSmaPositions} from './smaPos';


export type PxChartLegendProps = {
  data: PxData,
  legend: PxChartLegendData,
};

export const PxChartLegend = (props: PxChartLegendProps) => {
  const {legend} = props;
  const {
    ema120Trend,
    ema120TrendChange,
    open,
    high,
    low,
    close,
    diffSma,
    diffSmaTrend,
    decimals,
    epochSec,
  } = legend;

  // Not using diff from PxData because it is slightly lagged
  // > PxData not updated when market data updated
  const diff = close - open;

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
          <LegendSmaPositions {...props}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <LegendDataCell title="O" value={open} decimals={decimals}/>
          <LegendDataCell title="H" value={high} decimals={decimals}/>
          <LegendDataCell title="L" value={low} decimals={decimals}/>
          <LegendDataCell title="C" value={close} decimals={decimals} large/>
          <LegendDataCell
            title={<i className="bi bi-plus-slash-minus"/>}
            value={diff} decimals={decimals} useValueClass
          />
        </Col>
      </Row>
    </div>
  );
};
