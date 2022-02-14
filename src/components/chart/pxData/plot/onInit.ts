import {IPriceLine, ISeriesApi, LastPriceAnimationMode, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {formatSignedNumber} from '../../../../utils/string';
import {OnPxChartInitEvent, PxChartInitEventHandler} from '../type';
import {toBarData, toLineData} from '../utils';
import {handleLegendUpdate} from './eventHandler';
import {getSrLevelColor} from './utils';


const handlePrice = ({chartRef, chartDataRef, setObject}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  if (!chartRef.current) {
    throw new Error('Adding price while the chart is not ready');
  }

  const price = chartRef.current.addCandlestickSeries({
    title: chartDataRef.current.contract.symbol,
    priceFormat: {
      minMove: chartDataRef.current.contract.minTick,
    },
  });
  price.setData(chartDataRef.current.data.map(toBarData));

  setObject.legend((legend) => ({
    ...legend,
    close: chartDataRef.current.data.at(-1)?.close || legend.close,
  }));

  return price;
};

const handleVwap = ({chartRef, chartDataRef}: OnPxChartInitEvent): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error('Adding VWAP while the chart is not ready');
  }

  const vwap = chartRef.current.addLineSeries({
    color: '#5fa9ff',
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
  vwap.setData(chartDataRef.current.data.map(toLineData('vwap')));

  return vwap;
};

const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const {chartDataRef} = e;

  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  chartDataRef.current.supportResistance.forEach(({level, diffCurrent, type}) => {
    const title = formatSignedNumber(diffCurrent, decimalPlaces);

    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      title,
      color: getSrLevelColor(type),
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
  handleLegendUpdate(e, vwap, price);

  return {series: {price, vwap, avgCost: null}, lines: {srLevelLines}};
};
