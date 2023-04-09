"use client";

import clsx from "clsx";
import { CategoryItemProps } from "../navbar/categories/CategoryItem";

interface CategoryButtonProps extends CategoryItemProps {
  onClick: (category: string) => void;
}

export const CategoryButton = ({
  id,
  label,
  onClick,
  icon: Icon,
  isSelected,
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={clsx(
        "flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 p-4 text-xs transition hover:border-orange-600",
        isSelected ? "border-orange-600" : "border-neutral-200",
        isSelected ? "cursor-default" : "cursor-pointer"
      )}
    >
      {label}
      <Icon size={20} />
    </button>
  );
};
