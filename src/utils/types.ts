export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];
