export const getSrLevelLabel = (level: number, decimalPlaces: number, strength: number) => (
  `${level.toFixed(decimalPlaces)} (${(strength * 100).toFixed(1)}%)`
);
