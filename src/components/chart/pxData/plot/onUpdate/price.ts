import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {toBarData} from '../../utils';


export const handlePrice = ({chartDataRef, chartObjectRef, setObject, payload}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const {position} = payload;

  const {symbol, multiplier} = chartDataRef.current.contract;
  let title = symbol;
  if (position?.position) {
    const {close} = lastPrice;
    const {avgPx, position: quantity} = position;

    title += ` (${formatSignedNumber((close - avgPx) * quantity * multiplier, 2)})`;
  }

  price.setData(chartDataRef.current.data.map(toBarData));
  price.applyOptions({title});
  setObject.legend((legend) => ({
    ...legend,
    ...lastPrice,
    latestBar: lastPrice,
  }));
};
