import { useEffect, useRef } from 'react';

/**
 * UsePrevious returns the previous value of a given value.
 * @param {any} value - any
 * @returns The previous value of the input value.
 */
export function usePrevious<T>(value: any): T | undefined {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
