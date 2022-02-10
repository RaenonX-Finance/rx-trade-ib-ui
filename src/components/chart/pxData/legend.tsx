import React from 'react';

import styles from './legend.module.scss';
import {PxChartLegendData} from './type';


type Props = {
  legendData: PxChartLegendData,
};

export const PxChartLegend = ({legendData}: Props) => {
  const {vwap, close} = legendData;

  let vwapClassName: string;
  const vwapDiff = close - vwap;
  if (vwapDiff > 0) {
    vwapClassName = styles['vwap-buy'];
  } else if (vwapDiff < 0) {
    vwapClassName = styles['vwap-sell'];
  } else {
    vwapClassName = styles['vwap-neutral'];
  }

  return (
    <div className={`${styles['legend']} ${vwapClassName}`}>
      <span className={styles['vwap']}>
        VWAP:&nbsp;
        <span className={styles['vwap-text']}>{vwap.toFixed(2)}</span>
      </span>
    </div>
  );
};
