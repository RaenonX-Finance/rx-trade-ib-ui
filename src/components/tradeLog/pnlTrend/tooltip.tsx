import React from 'react';

import {TooltipProps} from 'recharts';

import {epochSecToFormattedString} from '../../../utils/chart';
import {formatSignedNumber} from '../../../utils/string';
import {RealizedExecutionGroup} from '../type';
import styles from './main.module.scss';


type Props = TooltipProps<number, string> & {
  decimals: number,
  minRealizedSum: number,
  maxRealizedSum: number,
};

export const PnLTrendTooltip = ({payload, decimals, minRealizedSum, maxRealizedSum}: Props) => {
  if (!payload || !payload.length || !payload[0].payload) {
    return <></>;
  }

  const {epochSec, realizedPnLSum} = payload[0].payload as RealizedExecutionGroup;

  const realizedSumExtrema = realizedPnLSum > 0 ? maxRealizedSum : minRealizedSum;

  let className;
  if (realizedPnLSum > 0) {
    className = styles['plot-tooltip-up'];
  } else if (realizedPnLSum < 0) {
    className = styles['plot-tooltip-down'];
  } else {
    className = styles['plot-tooltip-none'];
  }

  return (
    <div className={className}>
      <div>
        {epochSecToFormattedString(epochSec)}
      </div>
      <div className={styles['realized-pnl']}>
        {formatSignedNumber(realizedPnLSum, decimals)}
      </div>
      <div className={styles['realized-pnl-pct']}>
        {`${((realizedPnLSum / realizedSumExtrema) * 100).toFixed(2)}%`}
      </div>
    </div>
  );
};
