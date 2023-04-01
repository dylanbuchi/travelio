"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export const UserMenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </button>
  );
};
