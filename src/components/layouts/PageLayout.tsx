import { PropsWithChildren } from "react";
import { Header } from "../Header";

interface PageLayoutProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}
export const PageLayout = ({
  title = "",
  subTitle = "",
  children,
}: PageLayoutProps) => {
  return (
    <div className="container p-5 pt-[6rem]">
      <Header title={title} subTitle={subTitle} />
      <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
    </div>
  );
};
