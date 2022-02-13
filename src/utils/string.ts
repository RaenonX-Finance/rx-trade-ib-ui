export const formatSignedNumber = (num: number, decimalPlaces: number): string => {
  return `${num > 0 ? '+' : ''}${num.toFixed(decimalPlaces)}`;
};
