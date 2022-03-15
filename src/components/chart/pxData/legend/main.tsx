import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../../types/pxData';
import {epochSecToFormattedString} from '../../../../utils/chart';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';
import {getEma120Diff} from './utils';


type Props = {
  data: PxData,
  legend: PxChartLegendData,
};

export const PxChartLegend = ({data, legend}: Props) => {
  const {ema120, open, high, low, close, amplitudeHL, amplitudeOC, decimals, epochSec} = legend;

  const pivotIdx = data.data.findIndex(({epochSec: dataEpoch}) => dataEpoch == epochSec) - 120;
  const ema120Pivot = pivotIdx >= 0 ? data.data[pivotIdx].ema120 : undefined;

  let diffClassName: LegendDataCellProps['useValueClass'];
  const ema120Diff = getEma120Diff({ema120Pivot, ema120Current: ema120, close, pivotIdx});
  if (ema120Diff > 0) {
    diffClassName = 'up';
  } else if (ema120Diff < 0) {
    diffClassName = 'down';
  } else {
    diffClassName = 'neutral';
  }

  const diff = close - open;

  return (
    <div className={`${styles['legend']} ${styles[`diff-${diffClassName}`]}`}>
      <Row>
        <Col className="d-inline">
          <LegendDataCell value={epochSecToFormattedString(epochSec)} decimals={decimals} large/>
          <LegendDataCell
            title={<>HL&nbsp;<i className="bi bi-activity"/></>}
            value={amplitudeHL} decimals={decimals}
          />
          <LegendDataCell
            title={<>OC&nbsp;<i className="bi bi-activity"/></>}
            value={amplitudeOC} decimals={decimals}
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
