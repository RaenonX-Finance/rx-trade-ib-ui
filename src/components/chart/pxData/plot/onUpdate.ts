import {IPriceLine, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {OnPxChartUpdatedEvent, PxChartUpdatedEventHandler} from '../type';
import {toBarData, toLineData} from '../utils';
import {srLevelColor} from './const';


const handlePrice = ({chartDataRef, initData, setObject}: OnPxChartUpdatedEvent) => {
  const {price} = initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  price.update(toBarData(lastPrice));
  setObject.legend((legend) => ({...legend, close: lastPrice.close}));
};

const handleVwap = ({chartDataRef, initData, setObject}: OnPxChartUpdatedEvent) => {
  const {vwap} = initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData('vwap')(lastPrice);

  vwap.update(pxLine);
  setObject.legend((legend) => ({...legend, vwap: pxLine.value}));
};

const handleSR = ({chartDataRef, initData}: OnPxChartUpdatedEvent) => {
  const {price} = initData.series;

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  const existingLevels = new Set(Object.keys(initData.lines.srLevelLines));

  chartDataRef.current.supportResistance.forEach(({level, diffCurrent}) => {
    const priceLine: IPriceLine = initData.lines.srLevelLines[level];
    const title = `${diffCurrent > 0 ? '+' : ''}${diffCurrent.toFixed(decimalPlaces)}`;

    if (priceLine) {
      priceLine.applyOptions({title});
    } else {
      initData.lines.srLevelLines[level] = price.createPriceLine({
        price: level,
        axisLabelVisible: true,
        title,
        color: srLevelColor,
        lineWidth: 2,
        lineStyle: LineStyle.Dotted,
      });
    }

    existingLevels.delete(level.toString());
  });

  existingLevels.forEach((leftOverLevels) => {
    price.removePriceLine(initData.lines.srLevelLines[parseInt(leftOverLevels)]);
  });
};

export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleVwap(e);
  handleSR(e);
};
