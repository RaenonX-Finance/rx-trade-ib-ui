import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';
import {PnLStats} from './type';


const signToAvgPxClass: {[sign in number]: string} = {
  [1]: styles['px-section-up'],
  [0]: styles['px-section-neutral'],
  [-0]: styles['px-section-neutral'],
  [-1]: styles['px-section-down'],
};

type Props = {
  stats: PnLStats,
  decimals: number,
};

export const PnLPx = ({stats, decimals}: Props) => {
  const {avgPx, pxDiff} = stats;

  const pxDiffSign = Math.sign(pxDiff.val || 0);

  return (
    <div className={signToAvgPxClass[pxDiffSign]}>
      <Row>
        <Col className={styles['px-avg']}>
          {avgPx ? avgPx.toFixed(decimals) : '-'}
        </Col>
        <Col xs="auto">
          <Row>
            <Col xs="auto">
              <i className="bi bi-plus-slash-minus"/>
            </Col>
            <Col className={styles['px-diff-val']}>
              {pxDiff.val ? pxDiff.val.toFixed(2) : '-'}
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <i className="bi bi-activity"/>
            </Col>
            <Col className={styles['px-diff-val']}>
              {pxDiff.swingRatio ? pxDiff.swingRatio.toFixed(3) : '-'}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
