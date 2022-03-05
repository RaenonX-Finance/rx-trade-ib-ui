import React from 'react';

import {PxDataExtremaCurrentData} from '../../../types/pxData';
import styles from './main.module.scss';


type Props = {
  icon: React.ReactNode,
  data: PxDataExtremaCurrentData,
  decimals: number,
  suffix?: string,
};

export const PxExtremaItem = ({icon, data, decimals, suffix}: Props) => {
  const {val, pct} = data;

  let className;
  if (pct > 66) {
    className = styles['extrema-safe'];
  } else if (pct > 33) {
    className = styles['extrema-warning'];
  } else {
    className = styles['extrema-danger'];
  }

  return (
    <span className={className}>
      {icon}&nbsp;
      {`${val.toFixed(decimals)}${suffix || ''} (${pct.toFixed(2)}%)`}
    </span>
  );
};
