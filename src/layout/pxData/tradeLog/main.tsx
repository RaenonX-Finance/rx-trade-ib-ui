import React from 'react';

import Table from 'react-bootstrap/Table';

import {execSideColor} from '../../../components/chart/pxData/plot/const';
import {ExecutionGroup} from '../../../types/execution';
import {epochSecToFormattedString} from '../../../utils/chart';
import {formatSignedNumber} from '../../../utils/string';
import styles from './main.module.scss';


type Props = {
  executions: ExecutionGroup[],
};

const getClassName = (val: number | null): string => {
  if (!val) {
    return '';
  }
  if (val > 0) {
    return styles['up'];
  }
  if (val < 0) {
    return styles['down'];
  }
  return '';
};

export const TradeLog = ({executions}: Props) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Avg Px</th>
          <th>P&L</th>
          <th>P&L Sum</th>
          <th>Side</th>
          <th>Profit</th>
          <th>Loss</th>
          <th>WR</th>
          <th>Avg Profit</th>
          <th>Avg Loss</th>
          <th>R/R</th>
        </tr>
      </thead>
      <tbody>
        {
          [...executions]
            .sort((a, b) => b.epochSec - a.epochSec)
            .map((execution, idx) => (
              <tr key={idx}>
                <td>{epochSecToFormattedString(execution.epochSec)}</td>
                <td>{execution.avgPx}</td>
                <td className={getClassName(execution.realizedPnL)}>
                  {execution.realizedPnL && formatSignedNumber(execution.realizedPnL, 2)}
                </td>
                <td className={getClassName(execution.totalPnL)}>
                  {execution.totalPnL && formatSignedNumber(execution.totalPnL, 2)}
                </td>
                <td style={{color: execSideColor[execution.side]}}>{execution.side}</td>
                <td className={styles['up']}>{execution.realizedPnL && execution.profit}</td>
                <td className={styles['down']}>{execution.realizedPnL && execution.loss}</td>
                <td>{execution.realizedPnL && execution.winRate?.toFixed(3)}</td>
                <td className={styles['up']}>{execution.realizedPnL && execution.avgTotalProfit?.toFixed(2)}</td>
                <td className={styles['down']}>{execution.realizedPnL && execution.avgTotalLoss?.toFixed(2)}</td>
                <td>{execution.realizedPnL && execution.avgTotalRrRatio?.toFixed(3)}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};
