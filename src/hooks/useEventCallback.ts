import { useCallback, useEffect, useRef } from 'react';

type Fn<A extends unknown[], R> = (...args: A) => R;
type UseEventCallback = <A extends unknown[], R>(fn: Fn<A, R>) => Fn<A, R>;

export const useEventCallback: UseEventCallback = (fn) => {
  const functionRef = useRef(fn);
  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);
  return useCallback((...args) => functionRef.current(...args), []);
};
