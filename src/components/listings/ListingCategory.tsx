"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

const ListingCategory = ({
  icon: Icon,
  description,
  label,
}: ListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon size={25} className="text-neutral-600" />
            <div className="font-semibold">{label}</div>
          </div>
          <div className="font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
