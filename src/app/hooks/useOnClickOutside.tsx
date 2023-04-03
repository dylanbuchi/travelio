import { useEffect, RefObject } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLElement> | null,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref?.current && !ref?.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
