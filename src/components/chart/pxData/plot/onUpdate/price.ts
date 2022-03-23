import {OnPxChartUpdatedEvent} from '../../type';
import {toBarData} from '../../utils';


export const handlePrice = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const {symbol} = chartDataRef.current.contract;
  const title = symbol;

  price.setData(chartDataRef.current.data.map(toBarData));
  price.applyOptions({title});
  setObject.legend((legend) => ({
    ...legend,
    ...lastPrice,
    latestBar: lastPrice,
  }));
};
