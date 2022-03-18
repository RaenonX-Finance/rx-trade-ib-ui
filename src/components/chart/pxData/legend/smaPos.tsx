import React from 'react';

import {signToDirectionIcon} from '../../../../utils/icons';
import {PxChartLegendProps} from './main';
import styles from './main.module.scss';


export const LegendSmaPositions = ({data, legend}: PxChartLegendProps) => {
  const {close} = legend;

  return (
    <span className={styles['data-cell']}>
      SMA:&nbsp;S
      {data.smaPeriods.map((period) => {
        const sma = legend[`sma${period}`];

        if (!sma) {
          return (
            <React.Fragment key={period}>
              {signToDirectionIcon[NaN]}
            </React.Fragment>
          );
        }

        const diff = close - sma;

        let className;
        if (diff > 0) {
          className = styles['val-up'];
        } else if (diff < 0) {
          className = styles['val-down'];
        }

        return (
          <span key={period} className={className}>
            {signToDirectionIcon[Math.sign(close - sma)]}
          </span>
        );
      })}
      &nbsp;L
    </span>
  );
};
