import {ChartOptions, ColorType, DeepPartial} from 'lightweight-charts';


export const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.VerticalGradient,
      topColor: '#1e1e21',
      bottomColor: '#000000',
    },
    fontSize: 12,
    textColor: '#d5d5d5',
  },
  grid: {
    vertLines: {color: 'rgba(77, 77, 77, 0.5)'},
    horzLines: {color: 'rgba(77, 77, 77, 0.5)'},
  },
  localization: {
    dateFormat: 'yyyy-MM-dd',
  },
  timeScale: {
    timeVisible: true,
  },
};
