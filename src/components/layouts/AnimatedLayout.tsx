import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PropsWithChildren } from "react";

interface AnimatedLayoutProps extends PropsWithChildren {
  classes?: string;
}
export const AnimatedLayout = ({ classes, children }: AnimatedLayoutProps) => {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className={classes}>
      {children}
    </div>
  );
};
