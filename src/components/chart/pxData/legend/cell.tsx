import React from 'react';

import styles from './main.module.scss';


export type LegendDataCellProps = {
  title?: string,
  value?: string | number,
  decimals: number,
  large?: boolean,
  useValueClass?: 'neutral' | 'up' | 'down' | boolean,
};

export const LegendDataCell = ({title, value, decimals, large, useValueClass = false}: LegendDataCellProps) => {
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
    <div className={styles['data-cell']}>
      {title && <><span>{title}</span>&nbsp;</>}
      <span className={`${large ? styles['price-lg'] : ''} ${valueClass}`}>
        {value ?
          (typeof value === 'number' ? value.toFixed(decimals) : value) :
          '-'}
      </span>
    </div>
  );
};
