export const throwError = (message: string) => {
  throw new Error(message);
};

export const throwErrorC = (message: string) => () => throwError(message);
