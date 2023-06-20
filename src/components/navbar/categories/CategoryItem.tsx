import { IconType } from "react-icons";
import clsx from "clsx";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";
import { useRouter } from "next/navigation";

export interface CategoryItemProps {
  id: string;
  label: string;
  icon: IconType;
  description: string;
  isSelected?: boolean;
}

export const CategoryItem = ({
  id,
  label,
  icon: Icon,
  description,
  isSelected = false,
}: CategoryItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    let query = {};

    if (searchParams) {
      query = queryString.parse(searchParams.toString());
    }
    const updatedQuery = {
      ...query,
      category: id || undefined,
    };

    if (searchParams?.get("category") === id) delete updatedQuery.category;

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [searchParams, id, router]);
  return (
    <div
      role="button"
      onClick={handleOnClick}
      className={clsx(
        "h-full w-full cursor-pointer gap-1 p-2 transition hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-700",
        isSelected
          ? "text-orange-700 dark:text-orange-700"
          : "text-neutral-500 ",
        "flex flex-col items-center whitespace-nowrap",
        isSelected ? "underline underline-offset-4" : "no-underline"
      )}
    >
      <Icon size={25} />
      <h3 className="text-xs font-medium">{label}</h3>
    </div>
  );
};
