import {ExecutionSide, OrderSide} from '../../../../types/common';


export const srLevelColor = 'rgba(199, 56, 255, 0.6)';

export const srLevelColorEnhanced = 'rgba(255, 255, 0, 0.6)';

export const avgCostColor = 'rgba(240, 240, 240, 0.7)';

export const longDarkerColor = 'rgb(0, 55, 158)';

export const shortDarkerColor = 'rgb(158, 26, 0)';

export const longColor = 'rgba(28, 107, 255, 0.7)';

export const shortColor = 'rgba(255, 66, 28, 0.7)';

export const longLighterColor = 'rgb(92, 149, 255)';

export const shortLighterColor = 'rgb(255, 119, 92)';

export const openOrderColor: {[side in OrderSide]: string} = {
  BUY: longColor,
  SELL: shortColor,
};

export const openOrderPreviewColor: {[side in OrderSide]: string} = {
  BUY: longDarkerColor,
  SELL: shortDarkerColor,
};

export const execSideColor: {[side in ExecutionSide]: string} = {
  BOT: longLighterColor,
  SLD: shortLighterColor,
};
