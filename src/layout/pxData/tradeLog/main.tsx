import React from 'react';

import Table from 'react-bootstrap/Table';

import {execSideColor} from '../../../components/chart/pxData/plot/const';
import {ExecutionGroup} from '../../../types/execution';
import {epochSecToFormattedString} from '../../../utils/chart';


type Props = {
  executions: ExecutionGroup[],
};

export const TradeLog = ({executions}: Props) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Avg Px</th>
          <th>P&L</th>
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
                <td>{execution.realizedPnL?.toFixed(2)}</td>
                <td style={{color: execSideColor[execution.side]}}>{execution.side}</td>
                <td>{execution.realizedPnL && execution.profit}</td>
                <td>{execution.realizedPnL && execution.loss}</td>
                <td>{execution.realizedPnL && execution.winRate?.toFixed(3)}</td>
                <td>{execution.realizedPnL && execution.avgTotalProfit?.toFixed(2)}</td>
                <td>{execution.realizedPnL && execution.avgTotalLoss?.toFixed(2)}</td>
                <td>{execution.realizedPnL && execution.avgTotalRrRatio?.toFixed(3)}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};
