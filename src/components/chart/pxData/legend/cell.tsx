import React from 'react';

import {formatSignedNumber} from '../../../../utils/string';
import styles from './main.module.scss';


export type LegendDataCellProps = {
  title?: React.ReactNode,
  value?: string | number | null,
  decimals: number,
  large?: boolean,
  useValueClass?: 'neutral' | 'up' | 'down' | boolean,
};

export const LegendDataCell = ({
  title,
  value,
  decimals,
  large,
  useValueClass = false,
}: LegendDataCellProps) => {
  let valueClass = '';

  if (value) {
    if (typeof useValueClass === 'string') {
      if (useValueClass === 'up') {
        valueClass = styles['val-up'];
      } else if (useValueClass === 'down') {
        valueClass = styles['val-down'];
      }
    } else if (useValueClass) {
      if (value > 0) {
        valueClass = styles['val-up'];
      } else if (value < 0) {
        valueClass = styles['val-down'];
      }
    }
  }

  return (
    <div className={`${styles['data-cell']} ${valueClass}`}>
      {title && <><span>{title}</span>&nbsp;</>}
      <span className={large ? styles['price-lg'] : ''}>
        {value ?
          (
            typeof value === 'number' ?
              (
                typeof useValueClass === 'boolean' && useValueClass ?
                  formatSignedNumber(value, decimals) :
                  value.toFixed(decimals)
              ) :
              value
          ) :
          '-'}
      </span>
    </div>
  );
};
