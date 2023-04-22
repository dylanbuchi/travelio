"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CategoryItem } from "./CategoryItem";
import { CATEGORIES } from "./constants";

const Categories = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams?.get("category");

  if (pathname !== "/") return <></>;

  return (
    <div className="flex space-x-2 overflow-x-auto px-1 py-2">
      {CATEGORIES.map((item) => (
        <CategoryItem
          {...item}
          key={item.id}
          isSelected={item.id === category}
        ></CategoryItem>
      ))}
    </div>
  );
};

export default Categories;
