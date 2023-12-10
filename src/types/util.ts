export type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;
export type Range<Start extends number, End extends number> = ComputeRange<
  End,
  [Start]
>;
export type Nullable<T, PICK extends keyof T> = T extends object
  ? { [P in keyof T]: P extends PICK ? T[P] | null : T[P] }
  : T | null;