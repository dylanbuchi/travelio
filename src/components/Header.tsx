"use client";

import clsx from "clsx";

interface HeaderProps {
  title: string;
  subTitle?: string;
  alignCenter?: boolean;
}

export const Header = ({
  title,
  subTitle,
  alignCenter = false,
}: HeaderProps) => {
  return (
    <header className={clsx(alignCenter ? "text-center" : "text-start")}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subTitle && (
        <h2 className="mt-2 whitespace-pre-line font-semibold text-neutral-500 dark:text-gray-400">
          {subTitle}
        </h2>
      )}
    </header>
  ); 
};
