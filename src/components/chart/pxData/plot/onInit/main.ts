import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handleEma120} from './ema';
import {handlePxClick} from './order';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleVwap} from './vwap';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e);
  const ema120 = handleEma120(e);
  const srLevelLines = handleSR(e, price);
  handleLegendUpdate(e, vwap);
  handlePxClick(e, price);

  return {
    series: {price, vwap, ema120, avgCost: null, orderEntry: null},
    lines: {srLevelLines, openOrders: {}},
    position: null,
  };
};
