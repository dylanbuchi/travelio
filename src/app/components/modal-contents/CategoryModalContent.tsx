"use client";

import { CategoryButton } from "../buttons/CategoryButton";
import { CATEGORIES } from "../navbar/categories/constants";
import { ModalContentLayout } from "./ModalContentLayout";

interface CategoryModalContentProps {
  category: string;
  onClick: (category: string) => void;
}

export const CategoryModalContent = ({
  onClick,
  category,
}: CategoryModalContentProps) => {
  return (
    <ModalContentLayout
      title="Which of these categories matches your place the best?"
      subtitle="Pick a category"
    >
      <nav className="mt-1 grid grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
        {CATEGORIES.map((item) => (
          <div className="font-semibold" key={item.id}>
            <CategoryButton
              {...item}
              isSelected={category === item.id}
              onClick={(value) => onClick(value)}
            />
          </div>
        ))}
      </nav>
    </ModalContentLayout>
  );
};
