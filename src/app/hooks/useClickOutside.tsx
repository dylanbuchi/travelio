import { useEffect, RefObject, useCallback } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement> | null,
  callback: () => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref?.current?.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);
};
