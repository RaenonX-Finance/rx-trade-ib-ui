import {PxDataBarSmaKey} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent, PxChartLegendData} from '../../type';
import {toLineData} from '../../utils';
import {addSma} from '../onInit/sma';


export const handleSma = (e: OnPxChartUpdatedEvent) => {
  const {chartRef, chartDataRef, chartObjectRef, setObject, layoutConfig} = e;

  if (!chartObjectRef.current) {
    return;
  }

  const {sma} = chartObjectRef.current.initData.series;
  const hasSmaSeries = !!Object.keys(sma).length;

  if (!layoutConfig.sma.enable && hasSmaSeries) {
    // Remove SMAs according to the config
    Object.values(sma).map((series) => chartRef.current?.removeSeries(series));
    chartObjectRef.current.initData.series.sma = {};
    return;
  }

  const lastBar = chartDataRef.current.data.at(-1);

  if (!lastBar) {
    return;
  }

  if (!hasSmaSeries) {
    if (layoutConfig.sma.enable) {
      // Did not have SMAs, but config indicates should have it
      chartObjectRef.current.initData.series.sma = addSma(e);
    }

    return;
  }

  const legendOptions: Pick<PxChartLegendData, PxDataBarSmaKey> = {};

  Object.entries(sma).map(([period, smaSingle]) => {
    const smaKey: PxDataBarSmaKey = `sma${parseInt(period)}`;
    const pxLine = toLineData(smaKey)(lastBar);

    smaSingle.update(pxLine);

    legendOptions[smaKey] = pxLine.value;
  });

  setObject.legend((legend) => ({...legend, ...legendOptions}));
};
