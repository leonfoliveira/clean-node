export const generateStringWithLength = (length: number): string =>
  [...Array.from({ length }).keys()].map(() => '.').join('');

export const generateStringDifferent = (value: string): string => `diff_${value}`;
