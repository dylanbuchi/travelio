import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ListingCardLayoutProps extends PropsWithChildren {
  size?: number;
}

export const ListingCardLayout = ({
  size = 0,
  children,
}: ListingCardLayoutProps) => {
  return (
    <div className={clsx("mb-6", size < 5 ? "lg:mb-0" : "lg:mb-10")}>
      {children}
    </div>
  );
};
