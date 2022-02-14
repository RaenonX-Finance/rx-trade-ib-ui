import {OrderSide} from '../../../../types/openOrder';


export const srLevelColor = 'rgba(199, 56, 255, 0.6)';

export const srLevelColorEnhanced = 'rgba(255, 255, 0, 0.6)';

export const avgCostColor = 'rgba(240, 240, 240, 0.7)';

export const openOrderBuyColor = 'rgba(28, 107, 255, 0.7)';

export const openOrderSellColor = 'rgba(255, 80, 27, 0.7)';

export const openOrderColor: {[side in OrderSide]: string} = {
  BUY: openOrderBuyColor,
  SELL: openOrderSellColor,
};
