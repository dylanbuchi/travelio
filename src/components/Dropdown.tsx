import { useRef, useEffect, PropsWithChildren } from "react";
import autoAnimate from "@formkit/auto-animate";

interface DropdownProps extends PropsWithChildren {
  show: boolean;
}

export const Dropdown = ({ children, show }: DropdownProps) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div hidden={!show} ref={parent} className="w-full">
      {show && <>{children}</>}
    </div>
  );
};
