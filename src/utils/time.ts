export const updateEpochSecToLocal = (epochSec: number): number => {
  return epochSec - (new Date()).getTimezoneOffset() * 60;
};
