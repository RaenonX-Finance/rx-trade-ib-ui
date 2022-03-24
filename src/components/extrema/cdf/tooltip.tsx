import React from 'react';

import {TooltipProps} from 'recharts';

import {CdfData} from '../../../utils/cdf';
import styles from './main.module.scss';


type Props = TooltipProps<number, string> & {
  decimals: number,
};

export const PxExtremaCdfTooltip = ({payload, decimals}: Props) => {
  if (!payload || !payload.length || !payload[0].payload) {
    return <></>;
  }

  const {val, pct} = payload[0].payload as CdfData;

  let className;
  if (pct > 60) {
    className = styles['plot-tooltip-safe'];
  } else if (pct > 30) {
    className = styles['plot-tooltip-warning'];
  } else {
    className = styles['plot-tooltip-danger'];
  }

  return (
    <div className={className}>
      {`${val.toFixed(decimals)} (${pct.toFixed(2)}%)`}
    </div>
  );
};
