import {PxDataBarSmaKey} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent, PxChartLegendData} from '../../type';
import {toLineData} from '../../utils';


export const handleSma = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef, setObject, layoutConfig} = e;

  if (!chartObjectRef.current) {
    return;
  }

  const {sma} = chartObjectRef.current.initData.series;

  const lastBar = chartDataRef.current.data.at(-1);

  if (!lastBar) {
    return;
  }

  const legendOptions: Pick<PxChartLegendData, PxDataBarSmaKey> = {};

  Object.entries(sma).map(([period, smaSingle]) => {
    const smaKey: PxDataBarSmaKey = `sma${parseInt(period)}`;
    const pxLine = toLineData(smaKey)(lastBar);

    smaSingle.update(pxLine);
    smaSingle.applyOptions({visible: layoutConfig.sma.enable});

    legendOptions[smaKey] = pxLine.value;
  });

  setObject.legend((legend) => ({...legend, ...legendOptions}));
};
