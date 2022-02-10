import {IPriceLine, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {OnPxChartUpdatedEvent, PxChartUpdatedEventHandler} from '../type';
import {toBarData} from '../utils';


const handlePrice = ({chartData, initData}: OnPxChartUpdatedEvent) => {
  const {price} = initData.series;

  const lastPrice = chartData.data.at(-1);

  if (!lastPrice) {
    return;
  }

  price.update(toBarData(lastPrice));
};

const handleSR = ({chartData, initData}: OnPxChartUpdatedEvent) => {
  const {price} = initData.series;

  const decimalPlaces = getDecimalPlaces(chartData.contract.minTick);

  chartData.supportResistance.forEach(({level, diffCurrent}) => {
    const priceLine: IPriceLine = initData.lines.srLevelLines[level];
    const title = `${diffCurrent > 0 ? '+' : ''}${diffCurrent.toFixed(decimalPlaces)}`;

    if (priceLine) {
      priceLine.applyOptions({title});
    } else {
      initData.lines.srLevelLines[level] = price.createPriceLine({
        price: level,
        axisLabelVisible: true,
        title,
        color: 'rgba(255, 255, 0, 0.4)',
        lineWidth: 2,
        lineStyle: LineStyle.Dotted,
      });
    }
  });
};

export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleSR(e);
};
