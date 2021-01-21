export const generateString = (length: number): string =>
  [...Array.from({ length }).keys()].map(() => '.').join('');
