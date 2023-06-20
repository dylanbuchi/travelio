import { PropsWithChildren } from "react";
import { Header } from "../Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
interface PageLayoutProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}
export const PageLayout = ({
  title = "",
  subTitle = "",
  children,
}: PageLayoutProps) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="container p-5 pt-[6rem] dark:bg-gray-950">
      <Header title={title} subTitle={subTitle} />
      <div
        ref={parent}
        className="mt-4 grid grid-cols-1 gap-x-6 dark:bg-gray-950 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {children}
      </div>
    </div>
  );
};
