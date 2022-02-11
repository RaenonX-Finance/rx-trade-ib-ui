import {BusinessDay} from 'lightweight-charts';


export const businessDayToEpochSec = (day: BusinessDay): number => {
  return new Date(day.year, day.month - 1, day.day).getTime();
};

export const epochSecToFormattedString = (epochSec: number): string => {
  const date = new Date(epochSec * 1000);

  const iso = date.toISOString();

  const month = iso.slice(5, 7);
  const day = iso.slice(8, 10);
  const hour = iso.slice(11, 13);
  const min = iso.slice(14, 16);

  return `${month}-${day} ${hour}:${min}`;
};
