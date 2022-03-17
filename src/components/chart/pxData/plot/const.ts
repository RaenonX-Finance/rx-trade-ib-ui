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

export const orderSideColor: {[side in OrderSide]: string} = {
  BUY: longColor,
  SELL: shortColor,
};

export const actionSideColor: {[side in PriceActionSide]: string} = {
  LONG: longLighterColor,
  SHORT: shortLighterColor,
};

const srLevelColorWeak = 'rgba(255, 255, 0, 0.6)';

const srLevelColorStrong = 'rgba(255, 0, 234, 0.6)';

const srLevelColorScale = chroma.scale([srLevelColorWeak, srLevelColorStrong]);

export const getSrLevelColor = (ratio: number): string => {
  return srLevelColorScale(ratio).hex('rgba');
};

export const srLevelLineStyle: LineStyle = LineStyle.Dashed;

export const srLevelLineWidth: LineWidth = 1;

export const srLevelLineWidthStrong: LineWidth = 2;
