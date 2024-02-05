export const tapX =
  <T>(...str: string[]) =>
  (value: T) => {
    console.log(...str, '->', value);
    return value;
  };
