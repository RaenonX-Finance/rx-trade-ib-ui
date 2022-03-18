import React from 'react';

import Modal from 'react-bootstrap/Modal';

import {isRealizedExecution, TradeLogProps} from '../type';
import styles from './main.module.scss';
import {PnLTrendPlot} from './plot';


type Props = TradeLogProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const PnLTrend = ({symbol, executions, show, setShow}: Props) => {
  const realizedExecutions = executions.filter(isRealizedExecution);

  return (
    <Modal show={show} size="xl" centered onHide={() => setShow(false)} className={styles['pnl-trend-modal']}>
      <Modal.Header closeButton>
        <Modal.Title>{`PnL Trend (${symbol})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PnLTrendPlot realizedExecutions={realizedExecutions}/>
      </Modal.Body>
    </Modal>
  );
};
