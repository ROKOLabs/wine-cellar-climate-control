// parse response from firebase to a valid js object

export const jsonSafeParse = <T>(value: T) =>
  Boolean(value) ? JSON.parse(JSON.stringify(value)) : value;
