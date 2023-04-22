"use client";

import { Header } from "../Header";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

interface ModalContentLayoutProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export const ModalContentLayout = ({
  title,
  subtitle,
  children,
}: ModalContentLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Header title={title} subTitle={subtitle} />
      {children}
    </div>
  );
};
