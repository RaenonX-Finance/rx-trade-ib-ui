import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {formatSignedNumber} from '../../../utils/string';
import styles from './main.module.scss';
import {PnLSummary} from './type';


const signToSummarySectionClass: {[sign in number]: string} = {
  [1]: styles['summary-section-up'],
  [0]: styles['summary-section-neutral'],
  [-0]: styles['summary-section-neutral'],
  [-1]: styles['summary-section-down'],
};

const signToRealizationClass: {[sign in number]: string} = {
  [1]: styles['realization-up'],
  [0]: styles['realization-neutral'],
  [-0]: styles['realization-neutral'],
  [-1]: styles['realization-down'],
};

type Props = {
  summary: PnLSummary,
  icon: React.ReactNode,
};

export const PnLSummarySection = ({summary, icon}: Props) => {
  const {realized, unrealized} = summary;

  const total = (!!realized || !!unrealized) ? (realized || 0) + (unrealized || 0) : null;

  const realizedSign = Math.sign(realized || 0);
  const unrealizedSign = Math.sign(unrealized || 0);
  const totalSign = Math.sign(total || 0);

  return (
    <div className={signToSummarySectionClass[totalSign]}>
      <Row>
        <Col className={styles['total-section']}>
          <span>
            {icon}&nbsp;
            {total ? formatSignedNumber(total, 2) : '-'}
          </span>
        </Col>
        <Col xs="auto" className={styles['realization-section']}>
          <Row className={signToRealizationClass[unrealizedSign]}>
            <Col xs="auto">
              <i className="bi bi-activity"/>
            </Col>
            <Col>
              {unrealized ? formatSignedNumber(unrealized, 2) : '-'}
            </Col>
          </Row>
          <Row className={signToRealizationClass[realizedSign]}>
            <Col xs="auto">
              <i className="bi bi-cash"/>
            </Col>
            <Col>
              {realized ? formatSignedNumber(realized, 2) : '-'}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
