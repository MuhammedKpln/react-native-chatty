import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: any): T | undefined {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
