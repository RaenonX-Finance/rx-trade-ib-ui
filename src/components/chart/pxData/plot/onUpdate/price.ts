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

  price.setData(chartDataRef.current.data.map(toBarData));
  setObject.legend((legend) => ({
    ...legend,
    ...lastPrice,
    latestBar: lastPrice,
  }));
};
