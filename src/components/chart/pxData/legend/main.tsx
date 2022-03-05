import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {epochSecToFormattedString} from '../../../../utils/chart';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';


type Props = {
  data: PxChartLegendData,
};

export const PxChartLegend = ({data}: Props) => {
  const {vwap, open, high, low, close, amplitudeHL, amplitudeOC, decimals, epochSec} = data;

  let vwapClassName: LegendDataCellProps['useValueClass'];
  const vwapDiff = vwap ? close - vwap : 0;
  if (vwapDiff > 0) {
    vwapClassName = 'up';
  } else if (vwapDiff < 0) {
    vwapClassName = 'down';
  } else {
    vwapClassName = 'neutral';
  }

  const diff = close - open;

  return (
    <div className={`${styles['legend']} ${styles[`vwap-${vwapClassName}`]}`}>
      <Row>
        <Col className="d-inline">
          <LegendDataCell value={epochSecToFormattedString(epochSec)} decimals={decimals} large/>
          <LegendDataCell title="VWAP" value={vwap} decimals={2} useValueClass={vwapClassName}/>
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
