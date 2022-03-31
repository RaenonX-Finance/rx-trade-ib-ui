import React from 'react';

import Table from 'react-bootstrap/Table';

import {ExecutionGroup} from '../../types/execution';
import {epochSecToFormattedString} from '../../utils/chart';
import {formatSignedNumber} from '../../utils/string';
import {actionSideColor} from '../chart/pxData/plot/const';
import styles from './main.module.scss';
import {toActionSide} from './utils';


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

type Props = {
  executions: ExecutionGroup[],
  showNoPnL: boolean
};

export const TradeLogOffcanvas = ({executions, showNoPnL}: Props) => {
  return (
    <Table responsive className={styles['trade-log']}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Avg Px</th>
          <th>P&L</th>
          <th>∑ P&L</th>
          <th>Side</th>
          <th>Qty</th>
          <th>Px D</th>
          <th>∑ Px D</th>
          <th>Px D D/R</th>
          <th className={styles['column-separator']}/>
          <th>Profit</th>
          <th>Loss</th>
          <th>WR</th>
          <th>+ (L)</th>
          <th>- (L)</th>
          <th>WR (L)</th>
          <th>+ (S)</th>
          <th>- (S)</th>
          <th>WR (S)</th>
          <th>Avg +</th>
          <th>Avg -</th>
          <th>R/R</th>
          <th>EWR</th>
          <th>Avg Px+</th>
          <th>Avg Px-</th>
          <th>R/R</th>
          <th>EWR</th>
          <th>∑ Profit</th>
          <th>∑ Loss</th>
        </tr>
      </thead>
      <tbody>
        {[...executions]
          .filter(({realizedPnL}) => showNoPnL ? true : !!realizedPnL)
          .sort((a, b) => b.epochSec - a.epochSec)
          .map((execution, idx) => {
            const actionSide = toActionSide(execution.side, !!execution.realizedPnL);

            return (
              <tr key={idx}>
                <td>{epochSecToFormattedString(execution.epochSec)}</td>
                <td>{parseFloat(execution.avgPx.toFixed(2))}</td>
                <td className={getClassName(execution.realizedPnL)}>
                  {execution.realizedPnL && formatSignedNumber(execution.realizedPnL, 2)}
                </td>
                <td className={getClassName(execution.realizedPnLSum)}>
                  {execution.realizedPnLSum && formatSignedNumber(execution.realizedPnLSum, 2)}
                </td>
                <td style={{color: actionSideColor[actionSide]}}>
                  {actionSide}
                </td>
                <td>{execution.quantity}</td>
                <td className={getClassName(execution.pxSide)}>
                  {execution.pxSide && formatSignedNumber(execution.pxSide, 2)}
                </td>
                <td className={getClassName(execution.pxSideSum)}>
                  {execution.pxSideSum && formatSignedNumber(execution.pxSideSum, 2)}
                </td>
                <td>
                  {execution.pxSideDiffSmaRatio && `${execution.pxSideDiffSmaRatio.toFixed(3)}x`}
                </td>
                <td className={styles['column-separator']}/>
                <td className={styles['up']}>{execution.realizedPnL && execution.profit}</td>
                <td className={styles['down']}>{execution.realizedPnL && execution.loss}</td>
                <td>{execution.realizedPnL && execution.winRate?.toFixed(3)}</td>
                <td className={styles['up']}>{execution.realizedPnL && execution.profitLong}</td>
                <td className={styles['down']}>{execution.realizedPnL && execution.lossLong}</td>
                <td>{execution.realizedPnL && execution.winRateLong?.toFixed(3)}</td>
                <td className={styles['up']}>{execution.realizedPnL && execution.profitShort}</td>
                <td className={styles['down']}>{execution.realizedPnL && execution.lossShort}</td>
                <td>{execution.realizedPnL && execution.winRateShort?.toFixed(3)}</td>
                <td className={styles['up']}>
                  {execution.realizedPnL && execution.avgPnLProfit?.toFixed(2)}
                </td>
                <td className={styles['down']}>
                  {execution.realizedPnL && execution.avgPnLLoss?.toFixed(2)}
                </td>
                <td>{execution.realizedPnL && execution.avgPnLRrRatio?.toFixed(3)}</td>
                <td>{execution.realizedPnL && execution.avgPnLEwr?.toFixed(3)}</td>
                <td className={styles['up']}>
                  {execution.realizedPnL && execution.avgPxProfit?.toFixed(2)}
                </td>
                <td className={styles['down']}>
                  {execution.realizedPnL && execution.avgPxLoss?.toFixed(2)}
                </td>
                <td>{execution.realizedPnL && execution.avgPxRrRatio?.toFixed(3)}</td>
                <td>{execution.realizedPnL && execution.avgPxEwr?.toFixed(3)}</td>
                <td className={styles['up']}>
                  {execution.realizedPnL && execution.totalProfit?.toFixed(2)}
                </td>
                <td className={styles['down']}>
                  {execution.realizedPnL && execution.totalLoss?.toFixed(2)}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
