import {IPriceLine, ISeriesApi, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {OnPxChartInitEvent, PxChartInitEventHandler} from '../type';
import {toBarData, toLineData} from '../utils';


const handlePrice = ({chart, chartData}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  const price = chart.addCandlestickSeries({
    title: chartData.contract.symbol,
    priceFormat: {
      minMove: chartData.contract.minTick,
    },
  });
  price.setData(chartData.data.map(toBarData));

  return price;
};

const handleVwap = ({chart, chartData}: OnPxChartInitEvent): ISeriesApi<'Baseline'> => {
  const vwap = chart.addBaselineSeries();
  vwap.setData(chartData.data.map(toLineData('vwap')));

  return vwap;
};

const handleSR = ({chartData}: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartData.contract.minTick);

  chartData.supportResistance.forEach(({level, diffCurrent}) => {
    const title = `${diffCurrent > 0 ? '+' : ''}${diffCurrent.toFixed(decimalPlaces)}`;

    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      title,
      color: 'rgba(198, 222, 30, 0.4)',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });
  });

  return srLevelLines;
};


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e);
  const srLevelLines = handleSR(e, price);

  return {series: {price, vwap}, lines: {srLevelLines}};
};
