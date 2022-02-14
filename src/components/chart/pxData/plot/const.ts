import {OrderSide} from '../../../../types/common';


export const srLevelColor = 'rgba(199, 56, 255, 0.6)';

export const srLevelColorEnhanced = 'rgba(255, 255, 0, 0.6)';

export const avgCostColor = 'rgba(240, 240, 240, 0.7)';

export const buyThemeColor = 'rgba(28, 107, 255, 0.7)';

export const sellThemeColor = 'rgba(255, 66, 28, 0.7)';

export const tradeEntryColor = 'rgba(92, 149, 255, 0.8)';

export const tradeExitColor = 'rgba(255, 119, 92, 0.8)';

export const openOrderColor: {[side in OrderSide]: string} = {
  BUY: buyThemeColor,
  SELL: sellThemeColor,
};
