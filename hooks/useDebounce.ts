import { useCallback, useEffect, useRef } from "react";

export function useDebounce(delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const debounce = useCallback(
    (callback: () => void) => {
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          callback();
        }, delay);
      };
    },
    [delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debounce;
}
