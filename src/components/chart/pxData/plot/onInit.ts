import {BarPrice, BarPrices, IPriceLine, ISeriesApi, LastPriceAnimationMode, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {OnPxChartInitEvent, PxChartInitEventHandler} from '../type';
import {toBarData, toLineData} from '../utils';
import {srLevelColor} from './const';


const handlePrice = ({chart, chartDataRef, setLegend}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  const price = chart.addCandlestickSeries({
    title: chartDataRef.current.contract.symbol,
    priceFormat: {
      minMove: chartDataRef.current.contract.minTick,
    },
  });
  price.setData(chartDataRef.current.data.map(toBarData));

  setLegend((legend) => ({
    ...legend,
    close: chartDataRef.current.data.at(-1)?.close || legend.close,
  }));

  return price;
};

const handleVwap = (
  {chart, chartDataRef, setLegend}: OnPxChartInitEvent,
  price: ISeriesApi<'Candlestick'>,
): ISeriesApi<'Line'> => {
  const vwap = chart.addLineSeries({
    color: '#5fa9ff',
    lineWidth: 3,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
  vwap.setData(chartDataRef.current.data.map(toLineData('vwap')));

  const lastPrice = chartDataRef.current.data.at(-1);

  chart.subscribeCrosshairMove(({seriesPrices}) => {
    setLegend((legend) => ({
      ...legend,
      vwap: seriesPrices.get(vwap) as BarPrice || lastPrice?.vwap || legend.vwap,
      close: (seriesPrices.get(price) as BarPrices)?.close || lastPrice?.close || legend.close,
    }));
  });

  return vwap;
};

const handleSR = (
  {chartDataRef}: OnPxChartInitEvent,
  price: ISeriesApi<'Candlestick'>,
): Record<number, IPriceLine> => {
  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  chartDataRef.current.supportResistance.forEach(({level, diffCurrent}) => {
    const title = `${diffCurrent > 0 ? '+' : ''}${diffCurrent.toFixed(decimalPlaces)}`;

    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      title,
      color: srLevelColor,
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });
  });

  return srLevelLines;
};

export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e, price);
  const srLevelLines = handleSR(e, price);

  return {series: {price, vwap}, lines: {srLevelLines}};
};
