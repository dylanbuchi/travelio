"use client";

import clsx from "clsx";

interface HeaderProps {
  title: string;
  subTitle?: string;
  alignCenter?: boolean;
}

const Header = ({ title, subTitle, alignCenter = false }: HeaderProps) => {
  return (
    <header className={clsx(alignCenter ? "text-center" : "text-start")}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subTitle && (
        <h2 className="mt-2 font-semibold text-neutral-500">{subTitle}</h2>
      )}
    </header>
  );
};

export default Header;
