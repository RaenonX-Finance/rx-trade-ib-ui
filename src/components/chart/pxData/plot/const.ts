import chroma from 'chroma-js';
import {LineStyle, LineWidth} from 'lightweight-charts';

import {OrderSide, PriceActionSide} from '../../../../types/common';


export const avgCostColor = 'rgba(240, 240, 240, 0.7)';

export const longColor = 'rgba(28, 107, 255, 0.7)';

export const shortColor = 'rgba(255, 66, 28, 0.7)';

export const longLighterColor = 'rgb(92, 149, 255)';

export const shortLighterColor = 'rgb(255, 119, 92)';

export const bullishColor = '#00e071';

export const bearishColor = '#ff4b4b';

export const pxLineColors = {
  vwap: '#5fa9ff',
  ema120: '#dcdcdc',
};

export const orderSideColor: {[side in OrderSide]: string} = {
  BUY: longColor,
  SELL: shortColor,
};

export const actionSideColor: {[side in PriceActionSide]: string} = {
  LONG: longLighterColor,
  SHORT: shortLighterColor,
};

const srLevelColorWeak = 'rgba(255, 0, 221, 0.8)';

const srLevelColorStrong = 'rgba(255, 255, 0, 0.6)';

export const srLevelCustom = 'rgba(255, 109, 14, 0.6)';

const srLevelColorScale = chroma.scale([srLevelColorWeak, srLevelColorStrong]);

export const getSrLevelColor = (ratio: number): string => {
  return srLevelColorScale(ratio).hex('rgba');
};

export const srLevelLineStyle: LineStyle = LineStyle.Dashed;

export const srLevelLineWidth: LineWidth = 1;

export const srLevelLineWidthStrong: LineWidth = 2;

export const srLevelLineWidthSuperStrong: LineWidth = 3;

export const smaScale = chroma.scale([
  'rgba(255,82,82,0.75)',
  'rgba(255,153,0,0.75)',
  'rgba(255,235,59,0.75)',
  'rgba(76,176,79,0.75)',
  'rgba(34,148,242,0.75)',
  'rgba(138,41,194,0.75)',
]);
