import React from 'react';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {CdfData} from '../../../utils/cdf';
import styles from './main.module.scss';
import {PxExtremaCdfTooltip} from './tooltip';


export type PxExtremaCdfPlotProps = {
  data: CdfData[],
  decimals: number,
  currentPct?: number,
  stroke: string,
  reverseX?: boolean,
  syncId?: string,
};

export const PxExtremaCdfPlot = ({data, decimals, currentPct, stroke, reverseX, syncId}: PxExtremaCdfPlotProps) => {
  return (
    <ResponsiveContainer height={300} className={styles['plot']}>
      <LineChart data={data} layout="vertical" syncId={syncId}>
        <CartesianGrid strokeDasharray="3 3" strokeWidth={0.5}/>
        <XAxis
          dataKey={(data: CdfData) => data.val}
          tickCount={7}
          type="number"
          reversed={reverseX}
          stroke="#D9D9D9"
        />
        <YAxis
          dataKey={(data: CdfData) => data.pct}
          tickCount={6}
          tickFormatter={(val) => `${val}%`}
          stroke="#D9D9D9"
          min={0}
          max={100}
          reversed
        />
        <Tooltip content={<PxExtremaCdfTooltip decimals={decimals}/>}/>
        {currentPct && <ReferenceLine y={currentPct} stroke="#15FEFB" opacity={0.8}/>}
        <ReferenceLine y={50} stroke="#FFFFFF" strokeWidth={0.75}/>
        <ReferenceArea y1={100} y2={60} fill="#33ec57" fillOpacity={0.07}/>
        <ReferenceArea y1={60} y2={30} fill="#f5d937" fillOpacity={0.07}/>
        <ReferenceArea y1={30} y2={0} fill="#ff3d3a" fillOpacity={0.07}/>
        <Line
          type="monotone"
          dataKey={(data: CdfData) => data.val}
          stroke={stroke}
          dot={false}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
