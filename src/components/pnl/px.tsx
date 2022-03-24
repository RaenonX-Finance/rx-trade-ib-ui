import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useAnimation} from '../../hooks/animation';
import {formatSignedNumber} from '../../utils/string';
import styles from './main.module.scss';
import {PnLCommonProps, PnLStats} from './type';


const signToAvgPxClass: {[sign in number]: string} = {
  [1]: styles['px-section-up'],
  [0]: styles['px-section-neutral'],
  [-0]: styles['px-section-neutral'],
  [-1]: styles['px-section-down'],
};

type Props = PnLCommonProps & {
  stats: PnLStats,
  decimals: number,
};

export const PnLPx = ({stats, decimals, config}: Props) => {
  const {avgPx, pxDiff} = stats;
  const {pxDiffVal, pxDiffSmaRatio} = config;

  const ref = useAnimation<HTMLDivElement>({
    deps: [pxDiff],
  });

  const pxDiffSign = Math.sign(pxDiff.val || 0);

  let className = signToAvgPxClass[pxDiffSign];

  if ((pxDiff?.val && pxDiff.val < -pxDiffVal) || (pxDiff?.swingRatio && pxDiff.swingRatio < -pxDiffSmaRatio)) {
    className += ` ${styles['section-warning']}`;
  }

  return (
    <div ref={ref} className={className}>
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
              {pxDiff.val ? formatSignedNumber(pxDiff.val, 2) : '-'}
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <i className="bi bi-activity"/>
            </Col>
            <Col className={styles['px-diff-val']}>
              {pxDiff.swingRatio ? formatSignedNumber(pxDiff.swingRatio, 3) : '-'}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
