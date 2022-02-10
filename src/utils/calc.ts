export const getDecimalPlaces = (val: number): number => {
  if (Math.floor(val.valueOf()) === val.valueOf()) return 0;

  const str = val.toString();

  if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
    return parseInt(str.split('-')[1]) || 0;
  } else if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length || 0;
  }

  return parseInt(str.split('-')[1]) || 0;
};
