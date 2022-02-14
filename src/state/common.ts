export const wholeStateUpdateReducer = <T>(
  onEachValue?: (value: T) => T,
) => <S extends Record<number, T>, P extends Record<number, T>>(
  state: S, {payload}: {payload: P},
) => {
  // Remove all then add it back
  Object.keys(state).forEach((key) => delete state[parseInt(key)]);
  Object.entries(payload).forEach(([key, value]) => state[parseInt(key)] = onEachValue ? onEachValue(value) : value);
};
