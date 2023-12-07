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
