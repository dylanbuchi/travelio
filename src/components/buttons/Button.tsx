"use client";

import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  outline?: boolean;
  icon?: IconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classes?: string;
}

const buttonClasses = {
  base: "relative w-full rounded-lg border-[2px] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70",
  outline: {
    true: "dark:text-gray-300 dark:bg-gray-950 bg-white border-black text-black hover:bg-gray-100",
    false:
      "dark:bg-teal-950 bg-teal-600 border-teal-700 dark:border-teal-800 dark:text-gray-300 text-white",
  },
  size: {
    small: "py-1 text-sm font-normal",
    large: "py-3 text-md font-semibold",
  },
};

export const Button = ({
  label,
  isDisabled = false,
  isSmall = false,
  outline = false,
  icon: Icon,
  onClick,
  classes,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        buttonClasses.base,
        buttonClasses.outline[outline ? "true" : "false"],
        buttonClasses.size[isSmall ? "small" : "large"],
        classes
      )}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {label}
    </button>
  );
};
