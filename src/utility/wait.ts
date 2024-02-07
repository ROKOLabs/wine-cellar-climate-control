export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitC = (ms: number) => () => wait(ms);
